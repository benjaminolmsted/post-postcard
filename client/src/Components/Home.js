import Logout from "./Logout"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from "./NavBar"
import PostcardList from "./PostcardList"
import Menu from "./Menu"
import PostcardGenerator from "./PostcardGenerator"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" 
import Cart from "./Cart"
import Checkout from "./Checkout"

function Home({user, setUser}){
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState([])

    useEffect(()=>{
        const fetchUser = async ()=>{
            const resp = await fetch('/me')
            if(resp.ok){
                const fetchedUser = await resp.json()
                setUser(fetchedUser)
                fetchCart(fetchedUser)
                setIsLoading(false)
            }else{
                setIsLoading(false)
            }
        }
        
        const fetchCart = async (fetchedUser)=>{
            const resp = await fetch(`/usercart/${fetchedUser.id}`)
            const cartItems = await resp.json()
            setCart(cartItems)
        }

        fetchUser()
        //while (!user) {console.log(user)}
       
        // fetch('/me')
        // .then((resp)=>{
        //         if(resp.ok){
        //             resp.json().then((user)=>{
        //                setUser(user)
        //                setIsLoading(false)
        //         })}else{
        //             setIsLoading(false)
        //         }
            
        //     })
        }, [])

    async function addToCart(postcardId){
        const resp = await fetch('/carts', {method: 'POST', 
                         headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({user_id: user.id, postcard_id: postcardId})   })
        const cartItem = await resp.json()
        console.log(cartItem)
        setCart([cartItem, ...cart])
    }



    if(!user && !isLoading){
        history.push('/login')
    }    

    return (
        <>  
            <NavBar setUser={setUser}/>
            <Menu cart={cart}/>
            <Switch>
                <Route path='/generator'>
                    <PostcardGenerator user={user}/>
                </Route>
                <Route path='/cart'>
                    <Cart cart={cart} setCart={setCart}/>
                </Route>
                <Route path="/checkout">
                    <Checkout cart={cart}></Checkout>
                </Route>
                <Route path='/'>
                    <PostcardList cart={cart} setCart={setCart} addToCart={addToCart}></PostcardList>
                </Route>
            </Switch>
        </>
    )
}

export default Home
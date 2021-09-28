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
        fetch('/me')
        .then((resp)=>{
                if(resp.ok){
                    resp.json().then((user)=>{
                       setUser(user)
                       setIsLoading(false)
                })}else{
                    setIsLoading(false)
                }
            
            })
        }, [])

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
                    <PostcardList cart={cart} setCart={setCart}></PostcardList>
                </Route>
            </Switch>
        </>
    )
}

export default Home
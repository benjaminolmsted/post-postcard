import Logout from "./Logout"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from "./NavBar"
import PostcardList from "./PostcardList"
import Menu from "./Menu"
import PostcardGenerator from "./PostcardGenerator"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" 


function Home({user, setUser}){
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

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
            <NavBar />
            <Menu />
            <Switch>
                <Route path='/generator'>
                    <PostcardGenerator user={user}/>
                </Route>
                <Route path='/logout'>
                    <Logout setUser={setUser}/>
                    <p>{user.username}</p>
                </Route>
                <Route path='/'>
                    <PostcardList></PostcardList>
                </Route>
            </Switch>
        </>
    )
}

export default Home
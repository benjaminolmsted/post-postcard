import Logout from "./Logout"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from "./NavBar"
import PostcardList from "./PostcardList"
import Menu from "./Menu"
import PostcardGenerator from "./PostcardGenerator"

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
           
            <PostcardList></PostcardList>
            <Logout setUser={setUser}/>
            <PostcardGenerator />

            <p>{user.username}</p>
        </>
    )
}

export default Home
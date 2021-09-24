import Logout from "./Logout"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'


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
            <p>{user.username}</p>
            <Logout setUser={setUser}/>
        </>
    )
}

export default Home
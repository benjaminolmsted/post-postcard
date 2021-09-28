import { Button } from "@mui/material"


function Logout({ setUser }){

    function handleLogout(){
        fetch('/logout', {method: 'DELETE'})
        setUser(false)
    }

    return (
        <Button onClick={handleLogout} color='inherit'>Logout</Button>
    )

}

export default Logout
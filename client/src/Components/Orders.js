import { useEffect, useState } from 'react'


function Orders(){
    
    useEffect(() => {
        fetch('/orders')
        .then(response => response.json())
        .then(orders => console.log("something", orders))
    }, [])
    
    
    
    return (
        <></>
    )

}

export default Orders
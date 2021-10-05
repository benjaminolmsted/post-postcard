import { Card, Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'


function Orders(){
    const [orders, setOrders] = useState([])

        useEffect(() => {
        fetch('/orders')
        .then(response => response.json())
        .then(orders=> {console.log(orders) 
                        setOrders(orders)})
    }, [])
    
    
    
    return (
        <>
            <Container sx={{marginTop: '70px'}}>
                <Typography variant="h3">Orders</Typography>
                {orders.map((order) =>{
                   return (
                       <Card key={order.id} sx={{margin: '20px'}}>
                       <Grid container>
                        <Grid item xs={3}>
                        <Typography variant="h6">{`${order.first_name} ${order.last_name}`}</Typography>
                        <Typography variant="h6">{`${order.address_1}`}</Typography>
                        { order.address_2 ? <Typography variant="h6">{`${order.address_2}`}</Typography> : null}
                        <Typography variant="h6">{`${order.city}, ${order.state}, ${order.country}`}</Typography>
                        <Typography variant="h6">{`${order.zip}`}</Typography>
                        </Grid>
                        {order.postcards.map((postcard)=>{
                           return( <Grid key={postcard.id} item xs={3}>
                                <img width="100%" src={postcard.image_url}></img>
                            </Grid>
                           )
                        })}
                        </Grid>
                       </Card>
                   )
                })}
            </Container>
        </>
    )

}

export default Orders
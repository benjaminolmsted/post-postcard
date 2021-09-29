import { Container, Grid, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import PostcardCartCard from './PostcardCartCard'

const pricePerPostcard = 1.29;

function Cart({ cart, setCart }){
    
    function removeFromCart(cartItem){
        fetch(`/carts/${cartItem.id}`, {method: 'DELETE'})
        setCart(cart.filter((cartI)=> cartI.id !== cartItem.id))
        
    }

    function checkout(){

    }
    return (    
    <Container maxWidth="md"  sx={{ marginTop: "64px"}}>    
        <Grid container spacing={2}>
            {cart.map((cartItem)=>( 
                <Grid item xs={12} >
                    <PostcardCartCard cartItem={cartItem} removeFromCart={removeFromCart}/>
                </Grid>
                ))}
        </Grid>
        <Box sx={{marginTop: 4, float: 'right'}}>
            <Typography>{cart.length > 0 ?  "Total:" + cart.length*pricePerPostcard : "You're Cart is Empty!"} </Typography>
            <Button variant="contained" sx={{margin:3}} onClick={checkout}>Checkout</Button> 
        </Box>
    </Container>)
}

export default Cart
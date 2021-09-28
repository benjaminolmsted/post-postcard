import { Container, Grid, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import PostcardCartCard from './PostcardCartCard'

const pricePerPostcard = 1.29;

function Cart({ cart, setCart }){
    
    function removeFromCart(postcardId){
        setCart(cart.filter((postcard)=> postcard.id !== postcardId))
        //remove from cart on backend

    }

    function checkout(){

    }
    return (    
    <Container maxWidth="md"  sx={{ marginTop: "64px"}}>    
        <Grid container spacing={2}>
            {cart.map((postcard)=>( 
                <Grid item xs={12} >
                    <PostcardCartCard postcard={postcard} removeFromCart={removeFromCart}/>
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
import { Container, Grid, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import PostcardCartCard from './PostcardCartCard'
import { useHistory } from 'react-router-dom'

const pricePerPostcard = 2.19;

function Cart({ cart, setCart }){
    const history = useHistory() 
    
    function removeFromCart(cartItem){
        fetch(`/carts/${cartItem.id}`, {method: 'DELETE'})
        setCart(cart.filter((cartI)=> cartI.id !== cartItem.id))
        
    }

    function changeItemAmount(cartItem, amount){
        const newAmount = cartItem.amount + amount
        if(newAmount === 0){
            removeFromCart(cartItem)
        }else{
            cartItem.amount = newAmount
            fetch(`/carts/${cartItem.id}`, {method: "PATCH", 
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify({cart: cartItem})
                                            })
            .then(resp => resp.json())
            .then(setCart([...cart]))
        }
    }

    function checkout(){
        history.push('/checkout')
    }

    function calculateTotal(){
        console.log(cart)
        return cart.reduce((prevVal, currVal) => prevVal + currVal.amount, 0 )*pricePerPostcard
    }

    return (    
    <Container maxWidth="md"  sx={{ marginTop: "84px"}}>    
        <Grid container spacing={2}>
            {cart.map((cartItem)=>( 
                <Grid item xs={12} >
                    <PostcardCartCard 
                        key={cartItem.id} 
                        cartItem={cartItem} 
                        removeFromCart={removeFromCart}
                        changeItemAmount={changeItemAmount}
                        />
                </Grid>
                ))}
        </Grid>
        <Box sx={{marginTop: 4, float: 'right'}}>
            <Typography >{cart.length > 0 ?  "Total: " + calculateTotal() : "Your Cart is Empty!"} </Typography>
            {cart.length === 0 ? null : <Button color='secondary' variant="contained" sx={{float: 'right', margin:3}} onClick={checkout}>Checkout</Button> }
        </Box>
    </Container>)
}

export default Cart
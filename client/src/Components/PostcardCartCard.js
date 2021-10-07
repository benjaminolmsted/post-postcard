import { Button, Card, Typography, Box } from "@mui/material"


function PostcardCartCard({ cartItem, removeFromCart, changeItemAmount }){

return (<>
    <Card sx={{ borderRadius: 0 }}> 
        <img  width="100%" src={cartItem.postcard.image_url}></img>
        <Box sx={{display: 'inline'}}>
        <Button color="secondary" onClick={()=>changeItemAmount(cartItem, -1)} sx={{display: 'inline'}}>-</Button>
        <Typography sx={{display: 'inline'}}>{cartItem.amount ? cartItem.amount : "1"} </Typography>
        <Button color="secondary" onClick={()=>changeItemAmount(cartItem, 1)} sx={{display: 'inline'}}>+</Button>
        </Box>
        <Button onClick={()=>removeFromCart(cartItem)}>Remove from Cart</Button>                 
    </Card>

</>
    
    )
}

export default PostcardCartCard
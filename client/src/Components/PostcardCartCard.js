import { Button, Card } from "@mui/material"


function PostcardCartCard({ cartItem, removeFromCart }){

return (<>
    <Card sx={{ borderRadius: 0 }}> 
        <img  width="100%" src={cartItem.postcard.image_url}></img>
        <Button onClick={()=>removeFromCart(cartItem)}>Remove from Cart</Button>                 
    </Card>

</>
    
    )
}

export default PostcardCartCard
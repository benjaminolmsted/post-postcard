import { Button, Card } from "@mui/material"


function PostcardCartCard({ postcard, removeFromCart }){

return (<>
    <Card sx={{ borderRadius: 0 }}> 
        <img  width="100%" src={postcard.image_url}></img>
        <Button onClick={()=>removeFromCart(postcard.id)}>Remove from Cart</Button>                 
    </Card>

</>
    
    )
}

export default PostcardCartCard
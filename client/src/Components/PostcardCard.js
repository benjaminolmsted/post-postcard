import { Button, Card } from "@mui/material"
import { useState } from 'react'

function PostcardCard({ postcard }){
   const [showDelete, setShowDelete] = useState(false)
    function deletePostcard(){
        fetch(`/postcards/${postcard.id}`, {method: "DELETE"})
    }

    return (<>
    <Card raised onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
        <img width="100%" src={postcard.image_url}></img>
        {showDelete ? <Button onClick={deletePostcard}> Delete </Button> : null }
    </Card>
    </>)
}

export default PostcardCard
import { Card } from "@mui/material"


function PostcardCard({ postcard }){

    return (<>
    <Card raised>
        <img width="100%" src={postcard.url}></img>
    </Card>
    </>)
}

export default PostcardCard
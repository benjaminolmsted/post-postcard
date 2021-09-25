import PostcardCard from "./PostcardCard"
import { Container, Grid } from "@mui/material"

function PostcardList(){
    const postcards = [{url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}]
    return (<>
    <Container maxWidth="lg">    
        <Grid container spacing={2}>
            {postcards.map((postcard)=>( 
                <Grid item xs={4} >
                    <PostcardCard postcard={postcard}/>
                </Grid>
                ))}
        </Grid>
    </Container>
    </>)
}

export default PostcardList
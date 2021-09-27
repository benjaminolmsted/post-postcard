import PostcardCard from "./PostcardCard"
import { Container, Grid } from "@mui/material"
import { useEffect, useState } from 'react'


function PostcardList(){
    const [postcards, setPostcards] = useState([])//[{url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}, {url: "https://i.imgur.com/gYfe0K8.jpeg"}]
   
        useEffect(()=>{
            fetch("/postcards")
            .then((resp)=>resp.json())
            .then(postcards => setPostcards(postcards)) 
        }, [])

   
   return (<>
    <Container maxWidth="lg"  sx={{ marginTop: "64px"}}>    
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
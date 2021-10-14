import PostcardCard from "./PostcardCard"
import { Container, Grid } from "@mui/material"
import { useEffect, useState } from 'react'


function PostcardList({ cart, setCart, addToCart, fetchURL }){
    const [postcards, setPostcards] = useState([])
   
        useEffect(()=>{
            fetch(fetchURL)
            .then((resp)=>resp.json())
            .then(postcards => setPostcards(postcards)) 
        }, [fetchURL])

   
   return (<>
    <Container maxWidth="lg"  sx={{ marginTop: "84px"}}>    
        <Grid container spacing={2}>
            {postcards.map((postcard)=>( 
                <Grid key={postcard.id} item xs={6} >
                    <PostcardCard key ={postcard.id} postcard={postcard} postcards={postcards} setPostcards={setPostcards} cart={cart} setCart={setCart} addToCart={addToCart}/>
                </Grid>
                ))}
        </Grid>
    </Container>
    </>)
}

export default PostcardList
import PostcardCard from "./PostcardCard"
import { Container, Grid } from "@mui/material"
import { useEffect, useState } from 'react'


function PostcardList({ cart, setCart, addToCart }){
    const [postcards, setPostcards] = useState([])
   
        useEffect(()=>{
            fetch("/postcards")
            .then((resp)=>resp.json())
            .then(postcards => setPostcards(postcards)) 
        }, [])

   
   return (<>
    <Container maxWidth="lg"  sx={{ marginTop: "64px"}}>    
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
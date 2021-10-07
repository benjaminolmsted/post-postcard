import { Button, Card, Box, Modal } from "@mui/material"
import { useState } from 'react'


function PostcardCard({ postcard, postcards, setPostcards, cart, setCart, addToCart }){
   const [showDelete, setShowDelete] = useState(false)
   const [open, setOpen] = useState(false);
   const handleClose = () => setOpen(false);

   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    bordeRadius: 0,
  };

    function deletePostcard(){
        fetch(`/postcards/${postcard.id}`, {method: "DELETE"})
        setPostcards(postcards.filter((pc)=> pc.id !== postcard.id ))
    }

    function showBig(){
        setOpen(true)
    }

    return (<>
    <Card raised style={{height: '98.9%'}} onMouseEnter={() => setShowDelete(true)} 
    onMouseLeave={() => setShowDelete(false)}
    sx={{ borderRadius: 0, height: '100%', padding: '0px' }}>
        <img onClick={showBig} width="100%" src={postcard.image_url}></img>
        {showDelete ? <>
                        <Button onClick={deletePostcard}> Delete </Button>
                        <Button color="secondary" onClick={()=>addToCart(postcard.id)}>Add to Cart</Button>  
                        </> : null }
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: 0}}
        style={{}}
      >
        <Box style={{height: '92.5%'}} sx={style}>
         <img style={{padding: '0px'}} width="100%" src={postcard.image_url}></img>
        </Box>
      </Modal>
    </>)
}

export default PostcardCard
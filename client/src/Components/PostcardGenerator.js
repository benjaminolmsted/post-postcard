import { useRef, useEffect } from 'react'
import { Container } from '@mui/material'

function PostcardGenerator({ user }){
    let ref = useRef()

    const getPixelRatio = context => {
            var backingStore =
            context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
            
            return (window.devicePixelRatio || 1) / backingStore;
        }
    useEffect(()=>{
        let canvas = ref.current
        let context = canvas.getContext('2d')

        let ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
                 
        canvas.width = 2*width * ratio;
        canvas.height = 2*height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;


        context.beginPath()
        context.arc(50, 50, 50, 0, 2 * Math.PI)
        context.fill()
    })

   async function saveImage(){
        let canvas = ref.current
        let imageURL = canvas.toDataURL()

        const getURL = await uploadToAWS(imageURL, "postcards")
        // console.log(getURL)
        // console.log(user)
        const response = await fetch("/postcards", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({image_url: getURL, user_id: user.id})})
        const postcard = await response.json()
        console.log(postcard)    
    }

    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }
    
     const uploadToAWS = async(file, directory) => {
        
        const  data  = await fetch(`/presign?filename=postcard&fileType=image/png&directory=${directory}`, {method: "GET"})
        const json = await data.json();
        const { post_url, get_url } = json;
        const blob = dataURItoBlob(file)
        const awsResp = await fetch(post_url, {method: 'PUT', headers: {"Content-Type": 'image/png','acl': 'public-read'}, body: blob})
        console.log(awsResp)

     return get_url;
  }
    



    return (<>
        <Container maxWidth="lg"  sx={{ marginTop: "64px"}}>
         <canvas onClick={saveImage} ref={ref} style ={{width: "1200px", height: "800px"}}></canvas>
        </Container>
    </>)
}

export default PostcardGenerator
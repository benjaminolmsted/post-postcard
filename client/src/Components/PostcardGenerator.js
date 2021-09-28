import { useRef, useEffect } from 'react'
import { Button, Container } from '@mui/material'

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
    })

    function randomPrimary(){
        let colors = ['#00FFFF', '#FFFFFF', '#0000FF', '#FF00FF', '#FF0000', '#00FF00', '#FF0000']
        return colors[Math.floor(Math.random()*colors.length)]
    }

    function randomInt(max){
        return Math.floor(Math.random()*max)
    }

    function randomFloat(max){
        return Math.random()*max
    }

   function generatePostcard(){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        context.globalCompositeOperation = 'difference'

        for(let i=0; i<canvas.width; i+=150 ){
            context.fillStyle = randomPrimary()
            //context.beginPath()
            //context.arc(randomInt(canvas.width), randomInt(canvas.height), randomInt(canvas.width/15), randomFloat(2 * Math.PI), randomFloat(2 * Math.PI))
           // context.arc(randomInt(canvas.width), randomInt(canvas.height), randomInt(canvas.width/5), 0, 2 * Math.PI)
           // context.fill()
              context.fillRect(i, 0, i+150, canvas.height) 
        //    context.fillRect(0, i, canvas.width, i+1)  
        }
        for(let i=0; i<canvas.width; i+=150){
            context.fillStyle = randomPrimary()
            context.fillRect(0, i, canvas.width, i+150)
        }
        for(let i=0; i<canvas.width; i+=150 ){
            context.fillStyle = randomPrimary()
            context.beginPath()
            //context.arc(randomInt(canvas.width), randomInt(canvas.height), randomInt(canvas.width/15), randomFloat(2 * Math.PI), randomFloat(2 * Math.PI))
           context.arc(randomInt(canvas.width), randomInt(canvas.height), randomInt(canvas.width/5), 0, 2 * Math.PI)
           context.fill()
              //context.fillRect(i, 0, i+150, canvas.height) 
        //    context.fillRect(0, i, canvas.width, i+1)  
        }
   }

   function clearPostcard(){
    let canvas = ref.current
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
   }

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
        <Container maxWidth="lg"  sx={{ marginTop: "84px"}}>
         <canvas ref={ref} style ={{width: "1200px", height: "800px"}}></canvas>
         <Button onClick={saveImage}>Save</Button>

         <Button onClick={generatePostcard}>Generate</Button>

         <Button onClick={clearPostcard}>Clear</Button>
        </Container>
    </>)
}

export default PostcardGenerator
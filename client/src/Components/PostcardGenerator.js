import { useRef, useEffect } from 'react'
import { Button, Container, Card } from '@mui/material'

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
        //let colors = ['#00FFFF', '#FFFFFF', '#0000FF', '#FF00FF', '#FF0000', '#00FF00', '#FFFF00']
       let colors = ['#00FFFF', '#FF00FF', '#FFFF00']
       return colors[Math.floor(Math.random()*colors.length)]
    }

    function orderedPrimary(number){
        let colors = ['#00FFFF', '#FF00FF', '#FFFF00']
        return colors[number%(colors.length - 1)]
    }

    function makeRGBA(r, g, b, a){
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    function coinFlip(prob){
        if(Math.random() > prob){
            return 1
        }else{
            return 0
        }
    }

    function randomInt(max){
        return Math.floor(Math.random()*max)
    }

    function randomFloat(max){
        return Math.random()*max
    }

    function centeredCircles(){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        for(let i=0; i<53; i++){
            context.fillStyle = randomPrimary()//orderedPrimary(i)
            context.beginPath()
            context.arc(canvas.width/2, canvas.height/2, canvas.height/2-i*15, 0, 2 * Math.PI)
             context.fill()
        }
    }

    function noisyCircles(noise){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        let radius = 50
        let spread = radius
        for(let k = 0; k < 10; k++){
            for(let i=radius; i<canvas.width; i+=spread*2 ){
                for(let j = radius; j<canvas.height; j+=spread*2){
                    context.fillStyle = makeRGBA(j%255, 0, i%255 , 1)
                    context.beginPath()
                    context.arc(i + randomInt(5), j+ randomInt(5), radius+ randomInt(25), 0, 2 * Math.PI)
                    context.fill()
                } 
            }
        }   
    }

    function randomCircles(){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        for(let i=0; i<canvas.width; i+=150 ){
            context.fillStyle = randomPrimary()
            context.beginPath()
           context.arc(randomInt(canvas.width), randomInt(canvas.height), randomInt(canvas.width/5), 0, 2 * Math.PI)
           context.fill()
        }
    }

    function blackBars(){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        context.globalCompositeOperation = 'normal'

        for(let i = 0; i < canvas.height; i++){
            if(i%40==0){
                context.fillStyle = '#000000' //randomPrimary()
                context.fillRect(0, i, canvas.width, 15)
            }
        }
        for(let i = 0; i < canvas.width; i++){
            if(i%40==0){
                context.fillStyle = '#000000' //randomPrimary()
                context.fillRect(i, 0, 15, canvas.height)
            }
        }
    }

    function pixelCoverup(color= randomPrimary(), pixelSize= 100, pixelProb= .5){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        context.fillStyle = color
        for(let i = 0; i < canvas.width; i+=pixelSize){
            for(let j = 0; j < canvas.height; j+=pixelSize){
                if(coinFlip(pixelProb)){
                    context.fillRect(i, j, pixelSize, pixelSize)
                }
            }
        }
    }

    function randomGenerator(){
        let generators = [noisyCircles, centeredCircles, randomCircles, blackBars, pixelCoverup]
        return generators[Math.floor(Math.random()*generators.length)]
    }


   function generatePostcard(){
        let canvas = ref.current
        let context = canvas.getContext('2d')
        context.globalCompositeOperation = 'difference'
        context.fillStyle = randomPrimary()
        for(let i = 0; i < 3; i++){
            context.globalCompositeOperation = 'difference'

            randomGenerator()()
            context.globalCompositeOperation = 'difference'
            
        }
        //blackBars()
   }

   function generateNewPostcard(){
       clearPostcard()
       generatePostcard()
   }

   function clearPostcard(){
    let canvas = ref.current
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
   }

   async function saveImage(){
        let canvas = ref.current
        let imageURL = canvas.toDataURL()
        const blob = dataURItoBlob(imageURL)
        const getURL = await uploadToAWS(blob, "postcards")
        const response = await fetch("/postcards",
                                    {method: "POST", 
                                    headers: {'Content-Type': 'application/json'}, 
                                    body: JSON.stringify({image_url: getURL, user_id: user.id})})
        const postcard = await response.json()
        //setPostcards([...postcards, postcard])    
    }

    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }
    
     const uploadToAWS = async(blob, directory) => {
        const  data  = await fetch(`/presign?filename=postcard&fileType=image/png&directory=${directory}`, 
                                    {method: "GET"})
        console.log(data);
        const json = await data.json();
        const { post_url, get_url } = json;
        const awsResp = await fetch(post_url, 
                                    {method: 'PUT', 
                                    headers: {"Content-Type": 'image/png','acl': 'public-read'}, 
                                    body: blob})
        return get_url;
  }
    



    return (<>
        <Container maxWidth="lg"  sx={{ marginTop: "84px"}}>
        <Card raised sx={{borderRadius: '0px', height: '800px'}}>
         <canvas ref={ref} style ={{width: "1200px", height: "800px"}}></canvas>
         </Card>
         <Button variant='contained' color="secondary" onClick={saveImage}>Save</Button>
         <Button color="secondary" onClick={generateNewPostcard}>Generate New</Button>
         <Button color="secondary" onClick={generatePostcard}>Generate Over</Button>

         <Button color="secondary" onClick={clearPostcard}>Clear</Button>
        </Container>
    </>)
}

export default PostcardGenerator
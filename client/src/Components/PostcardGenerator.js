import { useRef, useEffect } from 'react'
import { Container } from '@mui/material'

function PostcardGenerator(){
    let ref = useRef()
    let imgRef = useRef()

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

    function saveImage(){
        let canvas = ref.current
        let image = imgRef.current
        let imageURL = canvas.toDataURL()

        image.src = imageURL
    }

    return (<>
        <Container>
         <canvas onClick={saveImage} ref={ref} style ={{width: "1200px", height: "800px"}}></canvas>
         <img ref={imgRef}/>
        </Container>
    </>)
}

export default PostcardGenerator
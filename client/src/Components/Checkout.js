import { Container } from "@mui/material"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import Review from "./Review"
import { useState } from "react"
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CheckoutForm from "./CheckoutForm"

function Checkout({ cart, setCart, user }){
    const [step, setStep] = useState(0)
    const [address, setAddress] = useState({
        first_name: '',
        last_name: '',

    })

    function next() {
        setStep((step)=>step+1)
    }

    function back(){
        setStep((step)=>step-1)
    }

    function placeOrder(){
        fetch('/orders', {method: 'POST', 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({...address, user_id: user.id})})
        .then(resp => resp.json())
        .then(data => {console.log(data)
                      setCart([])
        })
    }


    const steps = ['Shipping address', 'Review your order'];
    return (
        <Container sx={{width: '600px', marginTop: "64px"}}>
        <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={step} >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {step === 0 ? <AddressForm address={address} setAddress={setAddress}/> : null }
            {step === 1 ? <Review cart={cart} address={address} placeOrder={placeOrder}/> : null }
            {step > 0 ? <Button variant='contained' color='primary' onClick={back}>Back</Button> : null }
            {step < 1? <Button variant='contained' color='primary' onClick={next} sx={{float: 'right'}}>Next</Button>
                    : 
                     null } {/* <Button variant='contained' color='primary' onClick={placeOrder} sx={{float: 'right'}}>Place Order</Button> } */}
            </Container>
    )
}

export default Checkout
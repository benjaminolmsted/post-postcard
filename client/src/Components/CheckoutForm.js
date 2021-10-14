import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";



export default function CheckoutForm({ placeOrder, total }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({amount: total * 100})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      placeOrder()
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Box sx={{width: "100%"}} >
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      </Box>
      <Button
        onClick={handleSubmit}
        disabled={processing || disabled || succeeded}
        id="submit"
        sx={{float: 'right'}}
        variant="contained"
        color="secondary"
        >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Place Order"
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p>Please enter your credit card details. Use 4242 4242 4242 4242  for a succesful payment to stripe sandbox.</p>
      <p>Payments handled with Stripe.</p>
      
    </form>
  );
}
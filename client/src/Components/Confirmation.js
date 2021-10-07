import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system"




function Confirmation({orderData}){
    const { prodigi_order, order } = orderData
    console.log(orderData)
    return (
    <Container>
       <Box>
        <Typography variant="h6">
            Order Sent to Printers! Well, the printer's sandbox, anyway.
        </Typography>
        <Typography>
           Order Id: {prodigi_order.order.id}
        </Typography>
        <Typography variant="h6">
           Shipped to:
        </Typography>
        <Typography>
           {prodigi_order.order.recipient.name}
        </Typography>
        <Typography>
         {prodigi_order.order.recipient.address.line1}
        </Typography>
        <Typography>
        {prodigi_order.order.recipient.address.line2}
        </Typography>
        <Typography>
        {prodigi_order.order.recipient.address.townOrCity + ', ' + prodigi_order.order.recipient.address.stateOrCounty + ', ' + prodigi_order.order.recipient.address.countryCode + ", " + prodigi_order.order.recipient.address.postalOrZipCode}
        </Typography>
        </Box>
        <Box>
        <p className="result-message">
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a>
      </p>
        </Box>
    </Container>
)
}

export default Confirmation
import { Container, Typography } from "@mui/material"




function Confirmation({orderData}){
    const { prodigi_order, order } = orderData
    console.log(orderData)
    return (
    <Container>
        <Typography>
            Order Sent to Printers!
        </Typography>
        <Typography>
           Order Id: {prodigi_order.order.id}
        </Typography>

    </Container>
)
}

export default Confirmation
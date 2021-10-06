import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CheckoutForm from './CheckoutForm';

const pricePerPostcard = 2.19


function Review({cart, address, placeOrder}) {

  function calculateTotal(){
    return numberInCart()*pricePerPostcard
  }
  
  function numberInCart(){
    return cart.reduce((prevVal, currVal) => prevVal + currVal.amount, 0 )
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        
          <ListItem  key='postcard'>
            <ListItemText primary={numberInCart() + " " + (numberInCart() === 1 ? "Postcard" : "Postcards")} secondary="Glicee Printed" />
            <Typography variant="body2">{calculateTotal()}</Typography>
          </ListItem>
        
        <ListItem >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" >
            ${calculateTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom >
            Shipping
          </Typography>
          <Typography gutterBottom>{address.first_name + ' ' + address.last_name}</Typography>
          <Typography gutterBottom>{address.address_1}</Typography>
          <Typography gutterBottom>{address.address_2}</Typography>
          <Typography gutterBottom>{`${address.city}, ${address.state}, ${address.country}, ${address.zip}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom >
            Payment details
          </Typography>
             <CheckoutForm total={calculateTotal()} placeOrder={placeOrder}></CheckoutForm>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review//withStyles(styles)(Review);
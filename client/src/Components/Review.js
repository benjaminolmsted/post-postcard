import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CheckoutForm from './CheckoutForm';

const pricePerPostcard = 2.19

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review({cart, address, placeOrder}) {
  const  classes  = styles;
 

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
        
          <ListItem className={classes.listItem} key='postcard'>
            <ListItemText primary={numberInCart() + " " + (numberInCart() === 1 ? "Postcard" : "Postcards")} secondary="Glicee Printed" />
            <Typography variant="body2">{calculateTotal()}</Typography>
          </ListItem>
        
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${calculateTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{address.first_name + ' ' + address.last_name}</Typography>
          <Typography gutterBottom>{address.address_1}</Typography>
          <Typography gutterBottom>{address.address_2}</Typography>
          <Typography gutterBottom>{`${address.city}, ${address.state}, ${address.country}, ${address.zip}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
             <CheckoutForm total={calculateTotal()} placeOrder={placeOrder}></CheckoutForm>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Review//withStyles(styles)(Review);
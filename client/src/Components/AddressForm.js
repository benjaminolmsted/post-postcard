import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm({ address, setAddress}) {

  function onTextChange(e){
    setAddress({...address, [e.target.name]: e.target.value});
    //console.log(address)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="first_name"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={address.first_name}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="last_name"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={address.last_name}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address_1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={address.address_1}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address_2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={address.address_2}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={address.city}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          required
          id="state" 
          name="state" 
          label="State/Province/Region" 
          value={address.state}
            onChange={onTextChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={address.zip}
            onChange={onTextChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={address.country}
            onChange={onTextChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
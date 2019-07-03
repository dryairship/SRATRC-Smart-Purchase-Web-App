import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DropDownSelect from './dropdown-select';
import SuggestionSelect from './suggestion-select';
import OutlinedTextField from './outlined-textfield';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Purchase() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    productCategory: '',
    product: {
        name: '',
        description: 'Product Description',
    },
    vendor: {
        name: '',
        contactPerson: '',
        address: '',
        phone: '',
        email: '',
    },
    quantity: {
        value: 0,
        unit: ''
    },
    rate: {
        value: 0,
        unit: ''
    },
    isNewProduct: false,
    isNewVendor: false,
    quantityType: '',
    purchaseType: '',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  const onChooseCategory = chosenCategory => {
    setState({
      ...state,
      productCategory: chosenCategory,
    });
  };
  
  const onChooseQuantityType = chosenQuantityType => {
    setState({
      ...state,
      quantityType: chosenQuantityType,
    });
  };

  const onChooseQuantityUnit = chosenUnit => {
    setState({
      ...state,
      quantity: {
        ...state.quantity,
        unit: chosenUnit,
      },
    });
  };

  const onChooseRateUnit = chosenUnit => {
    setState({
      ...state,
      reate: {
        ...state.rate,
        unit: chosenUnit,
      },
    });
  };

  const onChoosePurchaseType = chosenPurchaseType => {
    setState({
      ...state,
      purchaseType: chosenPurchaseType,
    });
  };

  const onChooseProductName = chosenProduct => {
    var newDescription = state.product.description;
    if(chosenProduct.__isNew__){
      newDescription = ' ';
    }
    setState({
      ...state,
      product: {
        name: chosenProduct.label,
        description: newDescription,
      },
      isNewProduct: chosenProduct.__isNew__ ? true : false,
    });
  }
  
  const onChooseVendorName = chosenVendor => {
    var newContactPerson = state.vendor.contactPerson,
        newAddress = state.vendor.address,
        newPhone = state.vendor.phone,
        newEmail = state.vendor.email;
    if(chosenVendor.__isNew__){
      newAddress = ' ';
      newContactPerson = ' ';
      newEmail = ' ';
      newPhone = ' ';
    }
    setState({
      ...state,
      vendor: {
        name: chosenVendor.label,
        contactPerson: newContactPerson,
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      },
      isNewVendor: chosenVendor.__isNew__ ? true : false,
    });
  }
  
  const categories = [{ label: "Furniture & White Goods", value: "furniture" },
                      { label: "Consumables", value: "consumables" },
                      { label: "Services", value: "services" }];
                      

  const productsNameList = [
  { label: 'Table' },
  { label: 'Chair' },
  { label: 'ParleG Biscuits' },
  { label: 'Bicycle' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));
  const vendorsNameList = [
  { label: 'JohnnyBoy' },
  { label: 'CampusEShop' },
  { label: 'Amazon' },
  { label: 'PBirds Corporation' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));  
const units = [
  { label: 'kg' },
  { label: 'g' },
  { label: 'mg' },
  { label: 'tonne' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));
  const typesOfQuantities = [
  { label: 'Item' },
  { label: 'Mass' },
  { label: 'Volume' },
  { label: 'Length' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));
  const typesOfPurchase = [
  { label: 'Ad-Hoc' },
  { label: 'Planned' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingCartOutlinedIcon />
        </Avatar>
        
  <div className="divider" />
        <Typography component="h1" variant="h5">
          Make a Purchase
        </Typography>
        
  <div className="divider" />
        <form className={classes.form} noValidate>
          
          <DropDownSelect id="product-category" label="Product Category" items={categories} onValueChange={onChooseCategory}/>
          <SuggestionSelect id="product-name" label="Product Name" items={productsNameList} onValueChange={onChooseProductName}/>
          <OutlinedTextField id="product-description" label="Product Description" disabled={!state.isNewProduct} multiline={true}/>
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <SuggestionSelect id="vendor-name" label="Vendor Name" items={vendorsNameList} onValueChange={onChooseVendorName}/>
          <OutlinedTextField id="vendor-contact-person" label="Vendor Contact Person" value={state.vendor.contactPerson} disabled={!state.isNewVendor}/>
          <OutlinedTextField id="vendor-address" label="Vendor Address" value={state.vendor.address} disabled={!state.isNewVendor} multiline={true}/>
          <OutlinedTextField id="vendor-phone" label="Vendor Phone" value={state.vendor.phone} disabled={!state.isNewVendor}/>
          <OutlinedTextField id="vendor-email" label="Vendor Email" value={state.vendor.email} disabled={!state.isNewVendor}/> 
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <DropDownSelect id="product-type" label="Measure of quantity" items={typesOfQuantities} onValueChange={onChooseQuantityType}/>
          <OutlinedTextField id="purchase-quantity" label="Quantity Purchased" disabled={false} halfWidth={true} />
          <a>&nbsp;&nbsp;&nbsp;</a>
          <DropDownSelect id="quantity-unit" label="Unit" items={units} halfWidth={true} onValueChange={onChooseQuantityUnit}/>
          <h3>purchased @</h3>
          <OutlinedTextField id="purchase-rate" label="Rate" disabled={false} halfWidth={true} />
          <a>&nbsp;&nbsp;&nbsp;</a>
          <DropDownSelect id="rate-unit" label="per unit" items={units} halfWidth={true} onValueChange={onChooseRateUnit}/>
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <DropDownSelect id="purchase-type" label="Type of Purchase" items={typesOfPurchase} onValueChange={onChoosePurchaseType}/>
          <OutlinedTextField id="bill-number" label="Bill Number" value={state.billNumber}/>
          <OutlinedTextField id="remarks" label="Remarks" multiline={true}/>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Purchase Item
          </Button>
        </form>
      </div>
    </Container>
  );
}

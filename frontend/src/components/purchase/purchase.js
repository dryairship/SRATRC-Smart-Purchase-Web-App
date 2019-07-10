import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DropDownSelect from '../common/dropdown-select';
import SuggestionSelect from '../common/suggestion-select';
import OutlinedTextField from '../common/outlined-textfield';
import OKAlert from '../common/ok-alert';
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
    marginTop: theme.spacing(1),
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

var productsList = [];
var vendorsList = [];
var unitsList = [];
var selectableVendorsList = [];
var selectableCategoriesList = [];

var haveFetchedCategories = false;
var haveFetchedUnitTypes = false;
var haveFetchedUnits = false;
var haveFetchedVendors = false;
var haveFetchedProducts = false;

export default function Purchase() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    productCategory: '',
    product: {
      id: '',
      name: '',
      description: '',
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

  const [fetchedCategories, setFetchedCategories] = React.useState({categories: []});
  const [fetchedUnitTypes, setFetchedUnitTypes] = React.useState({unitTypes: []});
  const [selectedTypeUnits, setSelectedTypeUnits] = React.useState({units: []});
  const [alertState, setAlertState] = React.useState({show: false, message:'', title:''});
  const [selectedCategoryProducts, setSelectedCategoryProducts] = React.useState({productsNameList: []});

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);


  const fetchCategories = () => {
    fetch('/list/categories')
    .then(list => {
      return list.json();
    }).then(data => {
      setFetchedCategories({
        categories: data.items,
      });
      haveFetchedCategories = true;
    });
  }
  
  const fetchProducts = () => {
    fetch('/product')
    .then(list => {
      return list.json();
    }).then(data => {
      productsList = data;
      haveFetchedProducts = true;
    });
  }
  
    const fetchUnits = () => {
    fetch('/list/units')
    .then(list => {
      return list.json();
    }).then(data => {
      unitsList = data.items;
      haveFetchedUnits = true;
    });
  }
  
  const fetchVendors = () => {
    fetch('/vendor')
    .then(list => {
      return list.json();
    }).then(data => {
      vendorsList = data;
      haveFetchedVendors = true;
      selectableVendorsList = vendorsList.map(vendor => ({
        value: vendor._id,
        label: vendor.name,
      }));
    });
  }
  
  const fetchUnitTypes = () => {
    fetch('/list/unitTypes')
    .then(list => {
      return list.json();
    }).then(data => {
      setFetchedUnitTypes({
        unitTypes: data.items,
      });
      haveFetchedUnitTypes = true;
    });
  }
  
  haveFetchedCategories || fetchCategories();
  haveFetchedProducts || fetchProducts();
  haveFetchedVendors || fetchVendors();
  haveFetchedUnitTypes || fetchUnitTypes();
  haveFetchedUnits || fetchUnits();
  
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
      product: {
        id: '',
        name: '',
        description: '',
      }
      
    });
    setSelectedCategoryProducts({
      productsNameList: productsList
        .filter(product => {
            return product.category==chosenCategory;
        })
        .map(product => ({
          value: product._id,
          label: product.name,
        })),
    });
  };
  
  const onChooseQuantityType = chosenQuantityType => {
    setState({
      ...state,
      quantityType: chosenQuantityType,
    });
    setSelectedTypeUnits({
      units: unitsList
        .filter(uItem => { return uItem.label==chosenQuantityType; })
        .map(uItem => ({label: uItem.value, value: uItem.value}))
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
      rate: {
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
    
      if(chosenProduct.__isNew__){
        setState({
          ...state,
          product: {
            id: 'new',
            name: chosenProduct.label,
            description: '',
          },
          isNewProduct: true,
        });
        document.getElementById("product-description").value = "";
      }else{
        var desc = productsList.filter(pItem => {return pItem._id==chosenProduct.value})[0].description;
        setState({
          ...state,
          product: {
            id: chosenProduct.value,
            name: chosenProduct.label,
            description: "",
          },
          isNewProduct: false,
        });
        document.getElementById("product-description").value = desc;
      }
  }

  const onChooseVendorName = chosenVendor => {
    var newContactPerson, newAddress, newPhone, newEmail;
    if(chosenVendor.__isNew__){
      newContactPerson='';
      newAddress='';
      newPhone='';
      newEmail='';
    }else{
      var newVendor = vendorsList.filter(vItem => {return vItem._id==chosenVendor.value})[0];
      newContactPerson = newVendor.contactPerson;
      newAddress = newVendor.address;
      newPhone = newVendor.phone;
      newEmail = newVendor.email;
    }
    setState({
      ...state,
      vendor: {
        id: chosenVendor.value,
        name: chosenVendor.label,
        contactPerson: newContactPerson,
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      },
      isNewVendor: chosenVendor.__isNew__ ? true : false,
    });
    document.getElementById("vendor-contact-person").value = newContactPerson;
    document.getElementById("vendor-address").value = newAddress;
    document.getElementById("vendor-phone").value = newPhone;
    document.getElementById("vendor-email").value = newEmail;
  }

  const getProductId = () => {
    return new Promise((resolve, reject) => {
      if(state.isNewProduct){
        var product = {
          name: state.product.name,
          category: state.productCategory,
          description: document.getElementById('product-description').value,
        };
        fetch('/product', {
          method: 'POST',
          body: JSON.stringify(product),
          headers:{ 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then(response => {resolve(response);})
        .catch(error => {reject(error);});
      }else{
        resolve(state.product.id);
      }
    });
  }

  const getVendorId = () => {
    return new Promise((resolve, reject) => {
      if(state.isNewVendor){
        var vendor = {
          name: state.vendor.name,
          contactPerson: document.getElementById('vendor-contact-person').value,
          address: document.getElementById('vendor-address').value,
          phone: document.getElementById('vendor-phone').value,
          email: document.getElementById('vendor-email').value,
        };
        fetch('/vendor', {
          method: 'POST',
          body: JSON.stringify(vendor),
          headers:{ 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then(response => {resolve(response);})
        .catch(error => {reject(error);});
      }else{
        resolve(state.vendor.id);
      }
    });
  }

  const purchaseItem = (productId, vendorId) => {
    return new Promise((resolve, reject) => {
      var purchase = {
        productID: productId,
        vendorID: vendorId,
        billNumber: document.getElementById('bill-number').value,
        qValue: parseInt(document.getElementById('quantity-value').value),
        qUnit: document.getElementById('quantity-unit').value,
        rValue: parseInt(document.getElementById('rate-value').value),
        rUnit: document.getElementById('rate-unit').value,
        purchaseType: document.getElementById('purchase-type').value,
        remarks: document.getElementById('remarks').value,
      };
      fetch('/purchase', {
        method: 'POST',
        body: JSON.stringify(purchase),
        headers:{ 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(response => {resolve(response);})
      .catch(error => {reject(error);});
    });
  }

  const submitForm = () => {
    var productID, vendorID;
    getProductId()
    .then(pId => productID=pId)
    .then(() => {return getVendorId()})
    .then(vId => vendorID=vId)
    .then(()=>{return purchaseItem(productID, vendorID);})
    .then(result => {
      setAlertState({
        show: true,
        message: result,
        title: "Transaction successful",
      });
    })
    .catch(error => {
      setAlertState({
        show: true,
        message: error,
        title: "Transaction failed",
      });
    });
  }

  const closeAlert = () => {
    setAlertState({
      show: false,
      message: "",
      title: "",
    });
  }
  
  
  const typesOfPurchase = [
    { label: 'Ad-Hoc', value: 'ad-hoc' },
    { label: 'Planned', value: 'planned' },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} id="purchase-div">
        <Avatar className={classes.avatar}>
          <ShoppingCartOutlinedIcon />
        </Avatar>
        
  <div className="divider" />
        <Typography component="h1" variant="h5">
          Make a Purchase
        </Typography>
        
  <div className="divider" />
        <form className={classes.form} noValidate id="purchase-form">
          
          <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory}/>
          <SuggestionSelect id="product-name" label="Product Name" items={selectedCategoryProducts.productsNameList} onValueChange={onChooseProductName}/>
          <OutlinedTextField id="product-description" label="Product Description" value={state.product.description} disabled={!state.isNewProduct} multiline={true}/>
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <SuggestionSelect id="vendor-name" label="Vendor Name" items={selectableVendorsList} onValueChange={onChooseVendorName}/>
          <OutlinedTextField id="vendor-contact-person" label="Vendor Contact Person" value={state.vendor.contactPerson} disabled={!state.isNewVendor}/>
          <OutlinedTextField id="vendor-address" label="Vendor Address" value={state.vendor.address} disabled={!state.isNewVendor} multiline={true}/>
          <OutlinedTextField id="vendor-phone" label="Vendor Phone" value={state.vendor.phone} disabled={!state.isNewVendor}/>
          <OutlinedTextField id="vendor-email" label="Vendor Email" value={state.vendor.email} disabled={!state.isNewVendor}/> 
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <DropDownSelect id="product-type" label="Measure of quantity" items={fetchedUnitTypes.unitTypes} onValueChange={onChooseQuantityType}/>
          <OutlinedTextField id="quantity-value" label="Quantity Purchased" disabled={false} halfWidth={true} />
          <a>&nbsp;&nbsp;&nbsp;</a>
          <DropDownSelect id="quantity-unit" label="Unit" items={selectedTypeUnits.units} halfWidth={true} onValueChange={onChooseQuantityUnit}/>
          <h3>Purchased @</h3>
          <OutlinedTextField id="rate-value" label="Rate" disabled={false} halfWidth={true} />
          <a>&nbsp;&nbsp;&nbsp;</a>
          <DropDownSelect id="rate-unit" label="per unit" items={selectedTypeUnits.units} halfWidth={true} onValueChange={onChooseRateUnit}/>
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <DropDownSelect id="purchase-type" label="Type of Purchase" items={typesOfPurchase} onValueChange={onChoosePurchaseType}/>
          <OutlinedTextField id="bill-number" label="Bill Number" value={state.billNumber}/>
          <OutlinedTextField id="remarks" label="Remarks" multiline={true}/>
          
          <Button
            onClick={submitForm}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Purchase Item
          </Button>
        </form>
      </div>
      <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
      </div>
    </Container>
  );
}

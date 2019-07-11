import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import OKAlert from '../common/ok-alert';
import OutlinedTextField from '../common/outlined-textfield';
import DropDownSelect from '../common/dropdown-select';
import Box from '@material-ui/core/Box';
import SuggestionSelect from '../common/suggestion-select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';

var productsList = [];
var unitsList = [];

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

var haveFetchedCategories = false;
var haveFetchedUnitTypes = false;
var haveFetchedUnits = false;
var haveFetchedProducts = false;
var chosenTime = false;
var chosenDate = false;

export default function Donate() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    from: '',
    productCategory: '',
    product: {
      id: '',
      name: '',
      description: '',
    },
    quantity: {
      value: 0,
      unit: ''
    },
    isNewProduct: false,
    quantityType: '',
    timestamp: new Date(), 
  });

const [fetchedCategories, setFetchedCategories] = React.useState({categories: []});
const [fetchedUnitTypes, setFetchedUnitTypes] = React.useState({unitTypes: []});
const [selectedTypeUnits, setSelectedTypeUnits] = React.useState({units: []});
const [selectedCategoryProducts, setSelectedCategoryProducts] = React.useState({productsNameList: []});
const [alertState, setAlertState] = React.useState({show: false, message:'', title:''});
const [selectedDate, setSelectedDate] = React.useState(new Date());
const [isMoney, setIsMoney] = React.useState(false);
const [success, setSuccess] = React.useState(false);

function handleDateChange(date){
  setSelectedDate(date);
}

const fetchCategories = () => {
  fetch('/list/categories')
  .then(list => {
    return list.json();
  }).then(data => {
    data.items.push({
      label: "Money",
      value: "money", 
    });
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
haveFetchedUnitTypes || fetchUnitTypes();
haveFetchedUnits || fetchUnits();

const handleChange = name => event => {
  setState({
    ...state,
    [name]: event.target.value,
  });
};

const onChooseCategory = chosenCategory => {
  if(chosenCategory == "money"){
    setIsMoney(true);
  }else{
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
    setIsMoney(false);
  }
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

const makeDonation = (productId) => {
  return new Promise((resolve, reject) => {
    var donation = {
      productID: isMoney?'money': productId,
      donor: document.getElementById('donor').value,
      qValue: document.getElementById('quantity-value').value,
      qUnit: isMoney?'rupees':document.getElementById('quantity-unit').value,
      timestamp: selectedDate,
      remarks: document.getElementById('remarks').value,
    };
    fetch('/donation', {
      method: 'POST',
      body: JSON.stringify(donation),
      headers:{ 'Content-Type': 'application/json' }
    }).then(res => res.json())
    .then(response => {resolve(response);})
    .catch(error => {reject(error);});
  });
}

const submitForm = () => {
  var productID;
  getProductId()
  .then(pId => productID=pId)
  .then(()=>{return makeDonation(productID);})
  .then(result => {
    setAlertState({
      show: true,
      message: result,
      title: "Donation successful",
    });
    setSuccess(true);
  })
  .catch(error => {
    setAlertState({
      show: true,
      message: error,
      title: "Donation failed",
    });
    setSuccess(false);
  });
}


const closeAlert = () => {
  setAlertState({
    show: false,
    message: "",
    title: "",
  });
  if(success)
    window.location.href = '/makedonation' ;
}
  

return (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper} id="donation-div">
      <Avatar className={classes.avatar}>
        <PublicOutlinedIcon />
      </Avatar>
      
      <div className="divider" />
      <Typography component="h1" variant="h5">
        Make a Donation
      </Typography>
      
      <div className="divider" />
      <form className={classes.form} noValidate id="donation-form">
        
        <OutlinedTextField id="donor" label="Donor"/>
        <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory} />
        {isMoney?"":<SuggestionSelect id="product-name" label="Product Name" items={selectedCategoryProducts.productsNameList}  onValueChange={onChooseProductName}/>}
        {isMoney?"":<OutlinedTextField id="product-description" label="Product Description" value={state.product.description} disabled={!state.isNewProduct} multiline={true}/>}
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="mui-pickers-date"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="mui-pickers-time"
            label="Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
        
        {isMoney?"":<DropDownSelect id="product-type" label="Measure of quantity" items={fetchedUnitTypes.unitTypes} onValueChange={onChooseQuantityType}/>}
        <OutlinedTextField id="quantity-value" label={isMoney? "Amount Donated" : "Quantity Donated"} disabled={false} halfWidth={true} number={true} />
        <a>&nbsp;&nbsp;&nbsp;</a> 
        {isMoney?"":<DropDownSelect id="quantity-unit" label="Unit" items={selectedTypeUnits.units} halfWidth={true} onValueChange={onChooseQuantityUnit}/>}
        
        <OutlinedTextField id="remarks" label="Remarks" multiline={true}/>
        
        <Button
          onClick={submitForm}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Donate
        </Button>
      </form>
    </div>
    <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
    </div>
  </Container>
);
}

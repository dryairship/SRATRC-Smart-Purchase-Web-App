import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PlayListAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
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
var unitsList = [];
var selectableCategoriesList = [];

var haveFetchedCategories = false;
var haveFetchedUnitTypes = false;
var haveFetchedUnits = false;
var haveFetchedProducts = false;

export default function AddStock() {
  const classes = useStyles();
  const [state, setState] = React.useState({
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

  const addToStock = (productId) => {
    return new Promise((resolve, reject) => {
      var newStock = {
        productID: productId,
        departmentID: localStorage.getItem('department'),
        quantity: parseInt(document.getElementById('quantity-value').value),
        unit: document.getElementById('quantity-unit').value,
      };
      fetch('/inventory', {
        method: 'POST',
        body: JSON.stringify(newStock),
        headers:{ 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(response => {resolve(response);})
      .catch(error => {reject(error);});
    });
  }

  const submitForm = () => {
    var productID;
    getProductId()
    .then(productID=>{return addToStock(productID);})
    .then(result => {
      setAlertState({
        show: true,
        message: result,
        title: "Successfully updated stock",
      });
    })
    .catch(error => {
      setAlertState({
        show: true,
        message: error,
        title: "Could not update stock",
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
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} id="add-stock-div">
        <Avatar className={classes.avatar}>
          <PlayListAddOutlinedIcon />
        </Avatar>
        
  <div className="divider" />
        <Typography component="h1" variant="h5">
          Add items to stock
        </Typography>
        
  <div className="divider" />
        <form className={classes.form} noValidate id="add-stock-form">
          
          <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory}/>
          <SuggestionSelect id="product-name" label="Product Name" items={selectedCategoryProducts.productsNameList} onValueChange={onChooseProductName}/>
          <OutlinedTextField id="product-description" label="Product Description" value={state.product.description} disabled={!state.isNewProduct} multiline={true}/>
          
          <Divider style={({marginTop:'1rem', marginBottom:'1.5rem'})}/>
          
          <DropDownSelect id="product-type" label="Measure of quantity" items={fetchedUnitTypes.unitTypes} onValueChange={onChooseQuantityType}/>
          <OutlinedTextField id="quantity-value" label="Quantity" disabled={false} halfWidth={true} />
          <a>&nbsp;&nbsp;&nbsp;</a>
          <DropDownSelect id="quantity-unit" label="Unit" items={selectedTypeUnits.units} halfWidth={true} onValueChange={onChooseQuantityUnit}/>
          
          <Button
            onClick={submitForm}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add to Stock
          </Button>
        </form>
      </div>
      <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
      </div>
    </Container>
  );
}

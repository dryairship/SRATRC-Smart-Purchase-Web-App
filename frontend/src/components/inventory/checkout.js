import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Quantity from './Quantity';
import DropDownSelect from '../common/dropdown-select.js';
import Unarchive from '@material-ui/icons/Unarchive';
import SuggestionSelect from '../common/suggestion-select';
import OKAlert from '../common/ok-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OutlinedTextField from '../common/outlined-textfield';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignSelf: 'center',
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

var haveFetchedCategories = false;
var haveFetchedProducts = false;
var haveFetchedDepartment = false;
var productIsAvailable = false;
var haveCheckedLocalStorage = false;
var productAlreadyChosen = false;

export default function Checkout() {

    const classes = useStyles();
    const [state, setState] = React.useState({
      category: '',
      product: {
        id: '',
        name: '',
        description: '',
      }
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      if(inputLabel.current) setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    const [fetchedCategories, setFetchedCategories] = React.useState({categories: []});
    const [selectedCategoryProducts, setSelectedCategoryProducts] = React.useState({productsNameList: [], productsValueList: []});
    const [quantity , setQuantity] = React.useState(1);
    const [unit, setUnit] = React.useState('');
    const [Max, setMax] = React.useState(100);
    const [alertState, setAlertState] = React.useState({show: false, message:'', title:''});
    const [departments, setDepartments] = React.useState({});
    const [checkoutState, setCheckoutState] = React.useState(false);
    const department = localStorage.getItem('department');

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
      fetch('/inventory/department/' + localStorage.getItem('department'))
      .then(list => {
        return list.json();
      }).then(data => {
        productsList = data;
        haveFetchedProducts = true;
      });
    }

    const fetchDepartments = () => {
        haveFetchedDepartment = true;
        fetch('/list/departments')
        .then(list => {
          return list.json();      
        }).then(data => {
          data.items.unshift({value:'', label:''});
          var depts = data.items.reduce((map, dItem) => {
            map[dItem.value] = dItem.label;
            return map;
          });
          setDepartments(depts);
        });
      }

    
    const checkLocalStorage = () => {
      haveCheckedLocalStorage = true;
      var productForCheckout = JSON.parse(localStorage.getItem('productForCheckout'));
      if(productForCheckout){
        localStorage.removeItem('productForCheckout');
        productAlreadyChosen = true;
        setState({
          category: productForCheckout.details.category,
          product: {
            id: productForCheckout.details._id,
            name: productForCheckout.details.name,
            description: productForCheckout.details.description,
          }
        });
        setUnit(productForCheckout.quantity.unit);
        setMax(productForCheckout.quantity.value);
      }
    }

    haveCheckedLocalStorage || checkLocalStorage();
    haveFetchedCategories || fetchCategories();
    haveFetchedProducts || fetchProducts();
    haveFetchedDepartment || fetchDepartments();

    const onChooseCategory = chosenCategory => {
        setState({
        ...state,
        category: chosenCategory,
        product: {
          id: '',
          name: '',
          description: '',
        }
      });
      setSelectedCategoryProducts({
        productsNameList: productsList
          .filter(product => {
              return product.details.category==chosenCategory;
          })
          .map(product => ({
            value: product.productID,
            label: product.details.name,
          })),
      });
      setUnit('units');
    };



    const onChooseProductName = chosenProduct => {
        if(chosenProduct)
          {var prod = productsList.filter(pItem => {return pItem.productID==chosenProduct.value});
          if(prod.length == 0){
            productIsAvailable = false;
          }else{
            setState({
              ...state,
              product: {
                id: chosenProduct.value,
                name: chosenProduct.label,
                description: "",
              }
            });
            setUnit(prod[0].quantity.unit);
            setMax(prod[0].quantity.value);     
          }}   
    }

    const getQuantity = quantityFromChild => {
      setQuantity(quantityFromChild.value);
    }

    const transferItem = () => {
      return new Promise((resolve, reject) => {
        var checkout = {
          productID: state.product.id,
          departmentID: department,
          qValue: -quantity,
          unit: unit,
        };
        fetch('/inventory/' + department + '/' + state.product.id,{
          method: 'PATCH',
          body: JSON.stringify(checkout),
          headers:{'Content-Type': 'application/json'}
        })
        .then(res => {
          res.json()
          .then(result => {
            if(res.ok) resolve(result);
            else reject(result);  
          })
          .catch(error => {reject(error);});
        })
        .catch(error => {reject(error);});
      });
    }

    const submitForm = () => {
      transferItem()
      .then(result => {
        setAlertState({
          show: true,
          message: result, 
          title: "Checkout successful",
        });
        setCheckoutState(true);
      })
      .catch(error => {
        setAlertState({
          show: true,
          message: error,
          title: "Checkout failed",
        });
        setCheckoutState(false);
      })
    }

    const closeAlert = () => {
      setAlertState({
        show: false,
        message: "",
        title: "",
      });
      if(checkoutState) window.location.href = '/departmentinventory';
    }
  
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper} id="purchase-div">
          <Avatar className={classes.avatar}>
              <Unarchive />
          </Avatar>
          <Typography component="h1" variant="h5">
              Checkout an Item
          </Typography>
          <form className={classes.form} noValidate >
              <OutlinedTextField id="from_dept" label="From Department" value={departments[department]} valueSetter={true} disabled={true}/>
              { !productAlreadyChosen ?
              <React.Fragment>
                <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory} />
                <SuggestionSelect id="product-name" label="Product Name" category={state.category} items={selectedCategoryProducts.productsNameList} onValueChange={onChooseProductName} nonCreatable={true}/>
              </React.Fragment> : <React.Fragment>
                <OutlinedTextField id="product-category" label="Product Category" value={state.category} valueSetter={true} disabled={true}/> 
                <OutlinedTextField id="product-name" label="Product Name" value={state.product.name} valueSetter={true} disabled={true}/> 
              </React.Fragment>
              }
              <Quantity id="quantity" sendQuantity={getQuantity} Max={Max} unit={unit}/>
              <Button
                onClick={submitForm}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
            Confirm Checkout
          </Button>
          </form>
        </div>
        <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
      </div>
    </Container>
      );
}


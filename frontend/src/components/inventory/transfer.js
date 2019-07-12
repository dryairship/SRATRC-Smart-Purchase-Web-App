import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Quantity from './Quantity';
import DropDownSelect from '../common/dropdown-select.js';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
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
var haveFetchedDepts = false;
var productIsAvailable = false;
var haveCheckedLocalStorage = false;
var productAlreadyChosen = false;

export default function Transfer() {

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

    const handleChange = name => event => {
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    const [fetchedCategories, setFetchedCategories] = React.useState({categories: []});
    const [JSONCategories, setJSONCategories] = React.useState({});
    const [selectedCategoryProducts, setSelectedCategoryProducts] = React.useState({productsNameList: [], productsValueList: []});
    const [fetchedDepts, setFetchDepts] = React.useState({departments: []});
    const [quantity , setQuantity] = React.useState(1);
    const [toDept, setToDept] = React.useState('');
    const [unit, setUnit] = React.useState('');
    const [Max, setMax] = React.useState(100);
    const [alertState, setAlertState] = React.useState({show: false, message:'', title:''});
    const [departments, setDepartments] = React.useState({});
    const department = localStorage.getItem('department');
    const [transferState, setTransferState] = React.useState(false);

    const fetchCategories = () => {
        haveFetchedCategories = true;
      fetch('/list/categories')
      .then(list => {
        return list.json();
      }).then(data => {
        setFetchedCategories({
          categories: data.items,
        });
        data.items.unshift({value:'', label:''});
        var cats = data.items.reduce((map, cItem) => {
          map[cItem.value] = cItem.label;
          return map;
        });
        setJSONCategories(cats);
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
      haveFetchedDepts = true;
      fetch('/list/departments')
      .then(list => {
        return list.json();
      }).then(data => {
        setFetchDepts({
          departments: data.items.filter(item => {return item.value!==localStorage.getItem('department')}),
        });
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
      var productForTransfer = JSON.parse(localStorage.getItem('productForTransfer'));
      if(productForTransfer){
        localStorage.removeItem('productForTransfer');
        productAlreadyChosen = true;
        setState({
          category: productForTransfer.details.category,
          product: {
            id: productForTransfer.details._id,
            name: productForTransfer.details.name,
            description: productForTransfer.details.description,
          }
        });
        setUnit(productForTransfer.quantity.unit);
        setMax(productForTransfer.quantity.value);
      }
    }

    haveCheckedLocalStorage || checkLocalStorage();
    haveFetchedCategories || fetchCategories();
    haveFetchedProducts || fetchProducts();
    haveFetchedDepts || fetchDepartments();

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

    const onChooseToDept = chosenDept => {
      setToDept(chosenDept);
    }

    const getQuantity = quantityFromChild => {
      setQuantity(quantityFromChild.value);
    }

    const transferItem = () => {
      return new Promise((resolve, reject) => {
        var transferIt = {
          productID: state.product.id,
          fromDepartmentID: department,
          toDepartmentID: toDept,
          qValue: quantity,
          unit: unit,
        };
        fetch('/inventory/transfer',{
          method: 'PATCH',
          body: JSON.stringify(transferIt),
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
        console.log(result);
        setAlertState({
          show: true,
          message: result, 
          title: "Transfer successful",
        });
        setTransferState(true);
      })
      .catch(error => {
        setAlertState({
          show: true,
          message: error,
          title: "Transfer failed",
        });
        setTransferState(true);
      })
    }

    const closeAlert = () => {
      setAlertState({
        show: false,
        message: "",
        title: "",
      });
      if(transferState) window.location.href = '/departmentinventory';
    }
  
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper} id="purchase-div">
          <Avatar className={classes.avatar}>
              <SwapHorizIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Transfer an Item
          </Typography>
          <form className={classes.form} noValidate >
              <OutlinedTextField id="from_dept" label="From Department" value={departments[department]} valueSetter={true} disabled={true}/>
              { !productAlreadyChosen ?
              <React.Fragment>
                <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory} />
                <SuggestionSelect id="product-name" label="Product Name" category={state.category} items={selectedCategoryProducts.productsNameList} onValueChange={onChooseProductName} nonCreatable={true}/>
              </React.Fragment> : <React.Fragment>
                <OutlinedTextField id="product-category" label="Product Category" value={JSONCategories[state.category]} valueSetter={true} disabled={true}/> 
                <OutlinedTextField id="product-name" label="Product Name" value={state.product.name} valueSetter={true} disabled={true}/> 
              </React.Fragment>
              }
              <Quantity id="quantity" sendQuantity={getQuantity} Max={Max} unit={unit}/>
              <DropDownSelect id="to_dept" label="To Department" items={fetchedDepts.departments} onValueChange={onChooseToDept}/>
              <Button
                onClick={submitForm}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
            Confirm Transfer
          </Button>
          </form>
        </div>
        <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
      </div>
    </Container>
      );
}


import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Quantity from './Quantity';
import DropDownSelect from '../common/dropdown-select.js';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SuggestionSelect from '../common/suggestion-select';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import OutlinedTextField from '../common/outlined-textfield';

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
var productIsAvailable = false;



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
    const [selectedCategoryProducts, setSelectedCategoryProducts] = React.useState({productsNameList: [], productsValueList: []});
    const [quantity , setQuantity] = React.useState(0);
    const [toDept, setToDept] = React.useState('');
    const [unit, setUnit] = React.useState('');
    const [Max, setMax] = React.useState(100);


    
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
      fetch('/inventory/department/' + sessionStorage.getItem('department'))
      .then(list => {
        return list.json();
      }).then(data => {
        productsList = data;
        haveFetchedProducts = true;
      });
    }

    

    haveFetchedCategories || fetchCategories();
    haveFetchedProducts || fetchProducts();

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
        productsValueList: productsList
        .filter(product => {
            return product.details.category==chosenCategory;
        })
        .map(product => ({
          value: product.productID,
          label: product.quantity.value,
        })),
      });
    };



    const onChooseProductName = chosenProduct => {
        var prod = productsList.filter(pItem => {return pItem.productID==chosenProduct.value});
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
        }   
        console.log(prod);
        setMax(prod[0].quantity.value);     
    }

    const onChooseToDept = chosenDept => {
      setToDept(chosenDept);
    }

    const getQuantity = quantityFromChild => {
      setQuantity(quantityFromChild);
    }

    const products = [{label:'LOL', value:'LOL'}];

    const department = sessionStorage.getItem('department');

  
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
              <OutlinedTextField id="from_dept" label={department} disabled={true}/>
              <br></br>
              <DropDownSelect id="product-category" label="Product Category" items={fetchedCategories.categories} onValueChange={onChooseCategory} />
              <div><SuggestionSelect id="product-name" label="Product Name" items={selectedCategoryProducts.productsNameList} onValueChange={onChooseProductName} nonCreatable={productIsAvailable}/></div>
              <div><Quantity id="quantity" sendQuantity={getQuantity} Max={Max}/></div>
              <DropDownSelect id="to_dept" label="To Department" items={products} onValueChange={onChooseToDept}/>
          </form>
        </div>
    </Container>
      );
}


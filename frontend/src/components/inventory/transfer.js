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



const suggestions = [
  { label: 'Notebook' },
  { label: 'Almirah' },
  { label: 'Table' },
  { label: 'Milk' },
];

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


export default function Transfer() {

    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      category: 'select',
      product: 'select',
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

    const products = [{label:'LOL', value:'LOL'}];

    const department = "healthcare";

  
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* <br/> */}
      <div className={classes.paper} id="purchase-div">
      <Avatar className={classes.avatar}>
          <SwapHorizIcon />
        </Avatar>
      <Typography component="h1" variant="h5">
          Transfer an Item
        </Typography>
        <form className={classes.form} noValidate >
        <OutlinedTextField id="from_dept" label="From Department" disabled={true}/>
          <br></br>
          <DropDownSelect id="product-category" label="Product Category" items={products} />
          <div><SuggestionSelect id="product-name" label="Product Name" items={products}/></div>
          <div><Quantity id="quantity"/></div>
          <DropDownSelect id="to_dept" label="To Department" items={products}/>
        </form>
      </div>
    </Container>
      );
}


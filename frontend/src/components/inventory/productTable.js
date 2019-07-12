import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SuggestionSelect from '../common/suggestion-select';
import OutlinedTextField from '../common/outlined-textfield';
import Button from '@material-ui/core/Button';

import {
  MenuItem, Container
} from '@material-ui/core';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  if(typeof(array)!=='object') return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Department Name' },
  { id: 'quantity.value', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'quantity.unit', numeric: false, disablePadding: false, label: 'Unit' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    minWidth:'50%',
    maxWidth: '100%',
    flex: '0.7 1 auto',
  },
  formControl: {
    paddingRight: theme.spacing(2),
    minWidth: '50%',
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    // alignContent: 'center',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  title: {
    paddingTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(4),
  },
}));

var firstA = false;
var firstB=false;
var haveFetchedProducts = false;
var haveFetchedDepartments = false;
var haveFetchedCategories = false;

export default function ContentsTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [fetchedProducts, setFetchedProducts] = React.useState([]);
  const [fetchedCategories, setFetchedCategories] = React.useState({});
  const [chosenProduct, setChosenProduct] = React.useState({});
  const [chosenCategory, setChosenCategory] = React.useState('');
  const [chosenDescription, setChosenDescription] = React.useState('');
  const [productsNameList, setProductsNameList] = React.useState([]);
  const [departments, setDepartments] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes1 = useToolbarStyles();
  const dept = localStorage.getItem('department');
  const [value, setValue] = React.useState(dept);
  const [productChosen, setProductChosen] = React.useState(false);
  
  // const [rows, setRows] = React.useState([]);
  
  const fetchProducts = () => {
    haveFetchedProducts = true;
    fetch('/product')
    .then(list => {
      return list.json();
    }).then(data => {
      setFetchedProducts(data);
      setProductsNameList(data.map(pItem => ({value:pItem._id, label:pItem.name})));
    });
  }  
  
  const fetchCategories = () => {
    haveFetchedCategories = true;
    fetch('/list/categories')
    .then(list => {
      return list.json();
    }).then(data => {
      data.items.unshift({value:'', label:''});
      var cats = data.items.reduce((map, cItem) => {
        map[cItem.value] = cItem.label;
        return map;
      });
      setFetchedCategories(cats);
    });
  }  
  
  const fetchDepartments = () => {
    haveFetchedDepartments = true;
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
  
  haveFetchedProducts || fetchProducts();
  haveFetchedDepartments || fetchDepartments();
  haveFetchedCategories || fetchCategories();
  
  const fetchProductInInventory = (pID) => {
    fetch('/inventory/product/'+pID)
    .then(list => {
      return list.json();
    }).then(data => {
      console.log(data);
      setRows(data);
      haveFetchedProducts = true;
    });
  }
  
  function handleChange(event) {
      setValue(event.target.value);
     // fetchProducts(;vent.target.value);
    }
    
  function onChooseProduct(theChosenProduct) {
    var thisProduct = fetchedProducts.filter(pItem => pItem._id == theChosenProduct.value)[0];
    console.log("THISPRO");
    console.log(thisProduct);
    if(thisProduct){
    console.log("YASSSSS");
    }
    setChosenProduct(thisProduct);
    setChosenCategory(thisProduct.category);
    setChosenDescription(thisProduct.description);
    fetchProductInInventory(theChosenProduct.value);
    setProductChosen(true);
  }

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  const orderName = () => {
    firstA = true;
    setOrderBy('name');
  }
  const orderAsc = () => {firstB=true; setOrder('asc');}
    firstA || orderName();
    firstB || orderAsc();

  const request = () => {
    console.log("REQUESTING");
    console.log(chosenProduct);
    localStorage.setItem('onlyProductForRequest', JSON.stringify(chosenProduct));
    window.location.href = '/requestProduct';
  }

  console.log(rows);
  
  return (    
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper}>
        <div>        
          <Typography variant="h6" id="tableTitle" className={classes.title}>
            Inventory
          </Typography>
        </div>
        <Toolbar
          className={classes1.root}
        >
          <div className={classes1.actions}>
            <SuggestionSelect id="product-inventory" label="Product Name" items={productsNameList} onValueChange={onChooseProduct} nonCreatable={true}/>
            <OutlinedTextField id="pInventory-category" label="Product Category" value={fetchedCategories[chosenProduct.category]} valueSetter={true} disabled={true}/>
            <OutlinedTextField id="pInventory-description" label="Product Description" value={chosenProduct.description} valueSetter={true}  disabled={true}/>
          </div>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"            
          >
            <EnhancedTableHead              
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>           
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => { 
                  if(row.quantity.value>0)
                  return (
                    <TableRow
                      hover                      
                      tabIndex={-1}
                      key={row.name}
                    >                      
                      <TableCell component="th" scope="row" padding="default">
                        {departments[row.departmentID]}
                      </TableCell>
                      <TableCell align="right">{row.quantity.value}</TableCell>
                      <TableCell>{row.quantity.unit}</TableCell>
                    </TableRow>
                  );
                  else return "";
                })
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {!productChosen ? 
        <br/> :
        <Button onClick={request} variant="contained" color="primary" className={classes.button}>
          Request Transfer
      </Button>}
    </Container>
    
  );
}

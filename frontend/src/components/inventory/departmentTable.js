import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
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
import DropDownSelect from '../common/dropdown-select';
import {
  MenuItem, Container
} from '@material-ui/core';


var haveFetchedProducts = false;
var haveFetchedDepartments = false;
localStorage.setItem('fetchedDeptLists',false);
localStorage.setItem('deptList',{}.stringify);

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
  { id: 'name', numeric: false, disablePadding: false, label: 'Product Name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'quantity.value', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'action', numeric: false, center: true, disablePadding: false, label: 'Action' },
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
            align={row.center? 'center' : (row.numeric ? 'right' : 'left')}
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
    flex: '0 0 auto',
  },
  formControl: {
    paddingRight: theme.spacing(2),
    minWidth: 150,
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
}));
var firstA = false;
var firstB=false;
export default function ContentsTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const storedlist=localStorage.getItem('fetchedDeptLists') ? localStorage.getItem('deptList'): {items:[]}
  console.log('stored');
  console.log('status');
  console.log(localStorage.getItem('fetchedDeptLists'));
  console.log(storedlist);
  const [depts, setDepts] = React.useState(storedlist);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes1 = useToolbarStyles();
  const userdept = localStorage.getItem('department');
  // const [value, setValue] = React.useState(userdept);
  const [value, setValue] = React.useState(localStorage.getItem('department'));
  
  // const [rows, setRows] = React.useState([]);
  
  const fetchProducts = (newDept) => {
    fetch('/inventory/department/'+newDept)
    .then(list => {
      return list.json();      
    }).then(data => {
      setRows(data);
      haveFetchedProducts = true;
    });
  }

  const fetchDepartments = () => {
    fetch('/list/departments')
    .then(list => {
      return list.json();      
    }).then(data => {
      setDepts(data);
      haveFetchedDepartments = true;
      localStorage.setItem('fetchedDeptLists',true);
      localStorage.setItem('deptList',data.stringify);
    });
  }  

  haveFetchedProducts || fetchProducts(value);
  haveFetchedDepartments || fetchDepartments();
  //setDepts(localStorage.getItem('deptList'));
  
  function handleChange(event) {
      setValue(event.target.value);
      fetchProducts(event.target.value);
    }
    
  function handleDepartmentChange(chosenDepartment) {
      setValue(chosenDepartment);
      fetchProducts(chosenDepartment);
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
  
  function transferProductByID(product){
    localStorage.setItem('productForTransfer', JSON.stringify(product));
    window.location.href='/transfer';
  }
  
  function checkoutProductByID(product){
    localStorage.setItem('productForCheckout', JSON.stringify(product));
    window.location.href='/checkout';
  }
  
  function requestProductByID(product){
    localStorage.setItem('productForRequest', JSON.stringify(product));
    window.location.href='/requestProduct';
  }
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const orderName = () => {
    firstA = true;
    setOrderBy('name');
  }
  const orderAsc = () => {firstB=true; setOrder('asc');}
  firstA || orderName();
  firstB || orderAsc();

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
            <DropDownSelect id="inventory-department" label="Department" items={depts && depts.items ?depts.items:[]} onValueChange={handleDepartmentChange} defaultValue={value}/>
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
                  
                  return (
                    <TableRow
                      hover                      
                      tabIndex={-1}
                      key={row.id}
                    >                      
                      <TableCell component="th" scope="row" padding="default">
                        {row.details.name}
                      </TableCell>
                      <TableCell>{row.details.category}</TableCell>
                      <TableCell align="right">{row.quantity.value} {row.quantity.unit}</TableCell>
                      <TableCell align="center">
                          <Button 
                              variant="contained"
                              value={row.details._id}
                              color="primary" 
                              className={classes.button}
                              onClick={value==userdept ? function(){checkoutProductByID(row);} : function(){requestProductByID(row);}}
                            >
                            {value==userdept?"Checkout":"Request transfer"}
                          </Button>
                          &nbsp;&nbsp;&nbsp;
                          {value==userdept?<Button 
                              variant="contained"
                              value={row.details._id}
                              color="primary"
                              className={classes.button}
                              onClick={function(){transferProductByID(row);}}
                            >
                            Transfer
                          </Button>
                          :""}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    </Container>
    
  );
}

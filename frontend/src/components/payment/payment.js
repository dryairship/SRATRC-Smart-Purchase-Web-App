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
import Button from '@material-ui/core/Button';
import DropDownSelect from '../common/dropdown-select';
import {
  MenuItem, Container
} from '@material-ui/core';

const onPay = (e) => {
  console.log(e.target.parentElement.value);
}

var haveFetchedPayments = false;

var paymentsList = [];

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
  { id: 'product.name', numeric: false, disablePadding: false, label: 'Product' },
  { id: 'vendor.name', numeric: false, disablePadding: false, label: 'Vendor' },
  { id: 'purchase.timestamp', numeric: true, disablePadding: false, label: 'Date & Time' },
  { id: 'purchase.quantity.value', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'purchase.totalAmount', numeric: true, disablePadding: false, label: 'Total Amount' },
  { id: 'amountRemaining', numeric: true, disablePadding: false, label: 'Pending Amount' },
  { id: 'Pay', numeric: false, disablePadding: false, label: 'Pay' },
  { id: 'History', numeric: false, disablePadding: false, label: 'View History' }, 
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
  const [depts, setDepts] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('srec');

  const [state, setState] = React.useState({
    payments: []
  });
  const [fetchedPayments, setFetchedPayments] = React.useState({payments: []});

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  
  const fetchPayments = () => {
      fetch('/payment/department/'+sessionStorage.getItem("department"))
      .then(list => {
        return list.json();
      }).then(data => {
        setFetchedPayments({
          payments: data,
        });
        console.log(data);
        haveFetchedPayments = true;
        localStorage.setItem('payments', JSON.stringify(data));
      });
    }

  haveFetchedPayments || fetchPayments();


  
  

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

  

  return (    
    <Container component="main">
      <Paper className={classes.paper}>
        <div>        
          <Typography variant="h6" id="tableTitle" className={classes.title}>
            Payment Summary
          </Typography>
        </div>
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
              {stableSort(fetchedPayments.payments, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover                      
                      tabIndex={-1}
                      key={row.id}
                    >                   
                      <TableCell component="th" scope="row" padding="default">{row.product.name}</TableCell>
                      <TableCell align="left">{row.vendor.name}</TableCell>
                      <TableCell align="right">{(new Date(row.purchase.timestamp).toLocaleString())}</TableCell>
                      <TableCell align="right">{row.purchase.quantity.value}</TableCell>
                      <TableCell align="right">{row.purchase.totalAmount}</TableCell> 
                      <TableCell align="right">{row.amountRemaining}</TableCell>
                      <TableCell align="center">
                        <Button 
                          variant="contained" 
                          value={row.product} 
                          color="primary" 
                          disabled={row.amountRemaining==0}
                          className={classes.button} 
                          onClick={onPay} fullWidth
                          href={"/makePayment/"+row.purchase._id}
                        >
                          Pay
                        </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button 
                              variant="contained"
                              value={row.purchase._id}
                              color="primary" 
                              className={classes.button}
                              disabled={row.installments.length==0}
                              fullWidth
                              href={"/paymentsHistory/"+row.purchase._id}
                            >
                            History
                          </Button>
                        
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

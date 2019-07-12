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
    { id: 'timestamp', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'paidBy', numeric: false, disablePadding: false, label: 'Paid By' },
    { id: 'remarks', numeric: true, disablePadding: false, label: 'Remarks' }, 
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

var haveSelectedInstallment = false;

export default function PaymentHistory(props) {

  //console.log(props.match.params.id);
  const classes = useStyles();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [depts, setDepts] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [value, setValue] = React.useState('srec');
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [state, setState] = React.useState({
    payments: []
  });
  const [fetchedPayments, setFetchedPayments] = React.useState({payments: []});

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [selectedInstallment, setSelectedInstallment] = React.useState({installments: []});

   const viewHistory = () => {
        //console.log("MEOW");
        //console.log(props.match.params.id);
        //console.log(JSON.parse(localStorage.getItem('payments')));
        haveSelectedInstallment = true;
    setSelectedInstallment({
      installments: JSON.parse(localStorage.getItem('payments'))
        .filter(installment => installment.purchase._id == props.match.params.id )
        //.map(uItem => ({label: uItem.value, value: uItem.value}))
    });
  };

  console.log(selectedInstallment.installments[0]);
  haveSelectedInstallment || viewHistory();


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
  
  function formatTimestamp(timestamp) {
    
    var date = new Date(timestamp);
    return date.toLocaleString();
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const orderName = () => {
    firstA = true;
    setOrderBy('name');
  }
  const orderAsc = () => {firstB=true; setOrder('asc');}
  firstA || orderName();
  firstB || orderAsc();

  //console.log("lol");
  //console.log((selectedInstallment.installments && selectedInstallment.installments.length>0 ? selectedInstallment.installments[0].installments : []).length);
  
  return(
    <Container component="main" maxWidth="md">
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
                  {stableSort(selectedInstallment.installments && selectedInstallment.installments.length>0 ? selectedInstallment.installments[0].installments : [], getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      
                      return (
                        <TableRow
                          hover                      
                          tabIndex={-1}
                          key={row.id}
                        >         
                          <TableCell component="th" scope="row">{formatTimestamp(row.timestamp)}</TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell >{row.paidBy}</TableCell>
                          <TableCell align="right">{row.remarks}</TableCell>          
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
              count={(selectedInstallment.installments && selectedInstallment.installments.length>0 ? selectedInstallment.installments[0].installments : []).length}
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


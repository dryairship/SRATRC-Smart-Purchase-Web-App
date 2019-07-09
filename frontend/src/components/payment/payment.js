import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  paper: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  table: {
    minWidth: 650,
  },
}));

var paymentsList = [];

var haveFetchedPayments = false;



const onPay = (e) => {
  console.log(e.target.parentElement.value);
}

/*const onViewHistory = (e) => {
  console.log(e.target.parentElement.value);
}*/

export default function PaymentRecord() {
  const classes = useStyles();
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
        haveFetchedPayments = true;
        localStorage.setItem('payments', JSON.stringify(data));
      });
    }

  haveFetchedPayments || fetchPayments();

  return (
    <div className={classes.root}>

        <Container 
        component="main"
        maxWidth="md"
        >
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" align="center">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Vendor</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Pending Amount</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">View Payment History</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedPayments.payments.map(row => (
              <TableRow key={row.purchaseID}>
                <TableCell component="th" scope="row">
                  {row.product.name}
                </TableCell>
                <TableCell align="right">{row.purchase.quantity.value}</TableCell>
                <TableCell align="right">{row.vendor.name}</TableCell>
                <TableCell align="right">{row.purchase.totalAmount}</TableCell>
                <TableCell align="right">{row.amountRemaining}</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    value={row.product} 
                    color="primary" 
                    className={classes.button} 
                    onClick={onPay} fullWidth
                    href={"/payment_entry/"+row.purchase._id}
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
                      fullWidth
                      href={"/payment_history/"+row.purchase._id}
                    >
                    History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </Container>
    </div>
  );
}

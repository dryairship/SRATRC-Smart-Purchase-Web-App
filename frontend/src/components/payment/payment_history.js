import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

/*function createData(date ,amount ,paidBy ,remarks) {
  return { date ,amount ,paidBy ,remarks};
}

const rows = [
  createData("21/2/1999", 200 , 'me' ,'thanks'),
  createData("21/2/1999", 200 , 'me' ,'thanks'),
  createData("21/2/1999", 200 , 'me' ,'thanks'),
];
*/

var haveSelectedInstallment = false;

export default function PaymentHistory(props) {
  const classes = useStyles();

  //console.log(props.match.params.id);

  const [selectedInstallment, setSelectedInstallment] = React.useState({installments: []});

   const viewHistory = () => {
        console.log("MEOW");
        console.log(props.match.params.id);
        console.log(JSON.parse(localStorage.getItem('payments')));
        haveSelectedInstallment = true;
    setSelectedInstallment({
      installments: JSON.parse(localStorage.getItem('payments'))
        .filter(installment => installment.purchase._id == props.match.params.id )
        //.map(uItem => ({label: uItem.value, value: uItem.value}))
    });
  };
/*(
              
              
            ))*/
  haveSelectedInstallment || viewHistory();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Product"
            label="Product"
            id="produt"
            disabled
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Vendor"
            label="Vendor"
            id="vendor"
            disabled
          />
        <Table className={classes.table} size="small">
          <TableHead align="left">  
            <TableRow>
              <TableCell type="date">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Paid By</TableCell>
              <TableCell align="right">Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { selectedInstallment.installments[0] ? selectedInstallment.installments[0].installments.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.paidBy}</TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
              </TableRow>
              )): ""}
          </TableBody>
        </Table>
      </Paper>
      <Button variant="contained" color="primary" className={classes.button} href="/payments">
        Go Back
      </Button>
    </div>
  );
}

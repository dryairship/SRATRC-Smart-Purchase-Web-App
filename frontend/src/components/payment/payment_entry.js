  import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'date-fns';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import OKAlert from '../common/ok-alert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
  },
  form: {
    width: '70%', 
    marginTop: theme.spacing(1),
  },
}));


/*var array = localStorage.getItem("payments");
var array2 = JSON.parse(array);
var ID = array2[0].purchase._id;
*/
export default function PaymentForm(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [alertState, setAlertState] = React.useState({show: false, message:'', title:''});

  const classes = useStyles();

  function handleDateChange(date) {
    console.log(date);
    console.log("MOE");
    setSelectedDate(date);
  }

  const closeAlert = () => {
    setAlertState({
      show: false,
      message: "",
      title: "",
    });
  }

  const makePayment = () => {
    console.log(props.match.params.id);
    return new Promise((resolve, reject) => {
      var installment = {
        amount: parseInt(document.getElementById('amount').value),
        paidBy: document.getElementById('paidBy').value,
        remarks: document.getElementById('remarks').value,
      };
      console.log(installment);
      fetch('/payment/'+props.match.params.id, {
        method: 'POST',
        body: JSON.stringify(installment),
        headers:{ 'Content-Type': 'application/json' }
      }).then(res => res.json())
      .then(response => {resolve(response);})
      .catch(error => {reject(error);});
    });
  }


  const submitForm = (e) => {
    e.preventDefault();
    makePayment()
    .then(result => {
      console.log(result);
      setAlertState({
        show: true,
        message: result,
        title: "Payment successful",
      });
    })
    .catch(error => {
      setAlertState({
        show: true,
        message: error,
        title: "Payment failed",
      });
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline /> 
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Payment Details
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            fullWidth
            margin="normal"
            required
            id="amount"
            label="Amount"
            name="amount"
            type="numeric"
            autoFocus
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            fullWidth
            margin="normal"
            id="mui-pickers-date"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
            <KeyboardTimePicker
            fullWidth
            margin="normal"
            id="mui-pickers-time"
            label="Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          </MuiPickersUtilsProvider>
          <TextField
            fullWidth
            margin="normal"
            required
            className={classes.amountClass}
            name="paidBy"
            label="paidBy"
            id="paidBy"
          />
          <TextField
            fullWidth
            margin="normal"
            required
            className={classes.amountClass}
            name="remarks"
            label="Remarks"
            id="remarks"
          />
          <br/>
          <br/>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            type="submit"
            >
            Save
          </Button>
        </form>
      </div>
    <div className={classes.paper} id="response-div">
        <OKAlert show={alertState.show} title={alertState.title} message={alertState.message} onClose={closeAlert}/>
      </div>
    </Container>
  );
}

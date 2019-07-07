import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedTextField from '../common/outlined-textfield';
import DropdownSelect from '../common/dropdown-select';

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
    backgroundColor: theme.palette.common.white,
    fontSize: '20em',
    color: theme.palette.primary.main,
    width: 'auto',
    height: 'auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hiddenAlert: {
    display: 'none',
  },
  visibleAlert: {
    display: 'block',
  }
}));

var fetchedDepartments = false;

export default function Profile(props) {
  const classes = useStyles();
  
  const [alertState, setAlertState] = React.useState({
    status: false,
    message: '',
    type: 'normal'
  });
  
  const [departmentState, setDepartmentState] = React.useState({
    departments: []
  });

  const fetchDepartments = () => {
    fetch('/list/departments')
    .then(res => res.json())
    .then(list => {
      setDepartmentState({departments: list.items});
      fetchedDepartments=true;
    })
    .catch(error => {
      setAlertState({
        status: true,
        message: error,
        type: 'error'
      });
    });
  }
  
  const departmentSelected = chosenValue => {
    console.log(chosenValue);
  }

  fetchedDepartments || fetchDepartments();
  
  const createUser = event => {
    event.preventDefault();
    if(document.getElementById('create-user-password').value != document.getElementById('create-user-confirm-password').value){
      setAlertState({
        status: true,
        message: 'The passwords do not match',
        type: 'error'
      });
      return;
    }
    var newUser = {
      username: document.getElementById('create-user-username').value,
      name: document.getElementById('create-user-name').value,
      password: document.getElementById('create-user-password').value,
      department: document.getElementById('create-user-department').value,
      phone: document.getElementById('create-user-phone').value,
    };
    
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => {
      if(res.ok){
        res.json().then(response => {
          setAlertState({
            status: true,
            message: response,
            type: 'normal'
          });
        }).catch(error => {
          setAlertState({
            status: true,
            message: error,
            type: 'error'
          });
        });
      }else{
        res.json().then(response => {
          setAlertState({
            status: true,
            message: response,
            type: 'error'
          });
        }).catch(error => {
          setAlertState({
            status: true,
            message: error,
            type: 'error'
          });
        });
      }
    })
    .catch(error => {
      setAlertState({
        status: true,
        message: error,
        type: 'error'
      });
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} >
          <PersonAddIcon fontSize='inherit'/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Add User
        </Typography>
        <form className={classes.form} noValidate onSubmit={createUser}>
          <Box 
            id="create-user-alert-box"
            bgcolor={alertState.type=='normal' ? "primary.main" : "error.main"}
            color={alertState.type=='normal' ? "primary.contrastText" : "error.contrastText"}
            p={2}
            m={1}
            className={alertState.status ? classes.visibleAlert : classes.hiddenAlert}
          >
            {alertState.message}
          </Box>
          <OutlinedTextField label="Username" id="create-user-username"/>
          <DropdownSelect label="Department" id="create-user-department" items={departmentState.departments} onValueChange={departmentSelected}/>
          <OutlinedTextField label="Name" id="create-user-name"/>
          <OutlinedTextField label="Phone" id="create-user-phone"/>
          <OutlinedTextField label="Password" id="create-user-password" password={true}/>
          <OutlinedTextField label="Confirm Password" id="create-user-confirm-password" password={true}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            id="create-user-action-button"
          >
            Add User
          </Button>
        </form>
      </div>
    </Container>
  );
}

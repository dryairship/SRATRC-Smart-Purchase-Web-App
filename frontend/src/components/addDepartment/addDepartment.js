import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import {DomainOutlined} from '@material-ui/icons';
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
  const userdept = localStorage.getItem('department');

  if(userdept!="admin"){
    window.location.href='/';
  }

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
    .then(res => {console.log(res);return res.json();})
    .then(list => {
      console.log(list.items);
      setDepartmentState({departments: Array.isArray(list.items) ? list.items : []});
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

  const createDepartment = event => {
    event.preventDefault();
    var newDepartment = {
      name: document.getElementById('add-department-name').value
    };

    fetch('/list/departments', {
      method: 'POST',
      body: JSON.stringify(newDepartment),
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
          <DomainOutlined fontSize='inherit'/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Department
        </Typography>
        <form className={classes.form} noValidate onSubmit={createDepartment}>
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
          <OutlinedTextField label="Department Name" id="add-department-name"/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            id="add-department-action-button"
          >
            Add Department
          </Button>
        </form>
      </div>
    </Container>
  );
}

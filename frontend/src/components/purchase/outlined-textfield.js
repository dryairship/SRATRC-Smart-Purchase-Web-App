import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0,
  },
  halfWidth: {
    margin: theme.spacing(1),
    marginLeft: 0,
    width: '45%',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function OutlinedTextField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    value: '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  if(props.halfWidth){
  return (
      <TextField
        id={props.id}
        label={props.label}
        disabled={props.disabled}
        className={classes.halfWidth}
        defaultValue={props.value}
        onChange={handleChange('name')}
        variant="outlined"
        fullWidth
        multiline
        rowsMax="4"
      />
  );
  }
  if(props.multiline){
  return (
      <TextField
        id={props.id}
        label={props.label}
        className={classes.textField}
        disabled={props.disabled}
        defaultValue={props.value}
        onChange={handleChange('name')}
        variant="outlined"
        fullWidth
        multiline
        rowsMax="4"
      />
  );
  }else{
  return (
      <TextField
        id={props.id}
        label={props.label}
        className={classes.textField}
        disabled={props.disabled}
        defaultValue={props.value}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        fullWidth
      />
  );
  }
}

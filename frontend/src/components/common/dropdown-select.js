import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: 120,
  },
  halfFormControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: 120,
    width: '45%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProductCategory(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    chosenItem: '',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
    props.onValueChange(event.target.value);
  };
  
  if(props.halfWidth){
    return (
      <FormControl variant="outlined" className={classes.halfFormControl}>
        <InputLabel ref={inputLabel} htmlFor={props.id}>
          {props.label}
        </InputLabel>
        <Select
          native
          value={state.chosenItem}
          onChange={handleChange('chosenItem')}
          input={
            <OutlinedInput name={props.id} labelWidth={labelWidth} id={props.id} />
          }
        >
            <option value="" disabled="true"></option>
            {props && Array.isArray(props.items) ? props.items.map(item => <option key={item.value} value={item.value}>{item.label}</option>) : ""}
        </Select>
        
        <div className={classes.divider} />
      </FormControl>
  );
  }
  
  return (
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor={props.id}>
          {props.label}
        </InputLabel>
        <Select
          native
          defaultValue={props.defaultValue?props.defaultValue:state.chosenItem}
          onChange={handleChange('chosenItem')}
          input={
            <OutlinedInput name={props.id} labelWidth={labelWidth} id={props.id} />
          }
        >
            <option value="" disabled={true}></option>
            {props && Array.isArray(props.items) ? props.items.map(item => <option key={item.value} value={item.value} selected={item.value==props.defaultValue}>{item.label}</option>) : ""}
        </Select>
        
        <div className={classes.divider} />
      </FormControl>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DropDownSelect from '../common/dropdown-select.js';

const useStyles = makeStyles(theme => ({
  root: {
  },
  margin: {
    height: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
    marginLeft: 0,
    marginRight: 0,
  },
  slider: {
      width: '90%',
  }
}));

const max = 100;

const marks = [
    {   
        value: 0, 
        label: '0',
    },
    {
        value: max,
        label: max,
    },
]

const units = [
  {
    label: 'kg',
    value: 'kg',
  }
]

function valuetext(value) {
  return `${value}°C`;
}

export default function Quantity(props) {
  const classes = useStyles();

  const [quantityState, setQuantityState] = React.useState(0);
  const onTextFldChange = (e) => {
      if(e.target.value > max)   setQuantityState(max);   
      else setQuantityState(e.target.value);   
    }

  const handleSliderChange = (e, newValue) => {
    setQuantityState(newValue);
  }

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
        <Grid item xs={6} sm={8}><TextField
                id="text-id"
                label="Quantity"        
                value={quantityState}
                onChange={onTextFldChange}
                className={classes.textField}
                variant="outlined"
                fullWidth
        /></Grid>
        <Grid item xs={2} sm={4}><DropDownSelect  id="units" label="units" items={units}/></Grid>
    </Grid>
      <Slider
        id="slider-id"
        defaultValue={quantityState}
        value={quantityState}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={max}
        onChange={handleSliderChange}
        marks={marks}  
        className={classes.slider}
      />
    </div>
  );
}
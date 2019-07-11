import React from 'react';
import clsx from 'clsx';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'flex',
    padding: 5,
    height: 'auto',
    alignItems: 'center',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
    padding: 10,
  },
  placeholder: {
    fontSize: 16,
    padding: 10,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));
 
function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
 
NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};
 
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}
 
inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
 
function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;
 
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}
 
Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
};
 
function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}
 
Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
};
 
function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}
 
Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};
 
function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}
 
SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};
 
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
 
ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};
 
function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}
 
MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};
 
function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}
 
Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};
 
const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
 
export default function AutoSuggest(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState(null);
  // const [multi, setMulti] = React.useState(null);
  const [focusState, setFocusState] = React.useState(null);
  const [category, setCategory] = React.useState('');
 
  const handleChangeSingle = (value) => {
    props.onValueChange(value);
    setSingle(value);
    console.log(props.category)
    setCategory(props.category);
  }
 
  // function handleChangeMulti(value) {
  //   setMulti(value);
  // }
  
  function handleFocus(){
    setFocusState(true);
  }
 
  if(props.category !== category && single!==null ){
    console.log(props.category)
    handleChangeSingle(null);
    props.onValueChange(null);
    setCategory(props.category);
  }
  
  function handleBlur(){
    setFocusState(false);
  }
 
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    container: (base, state) => ({
      ...base,
      opacity: state.isDisabled ? ".5" : "1",
      backgroundColor: "transparent",
      zIndex: focusState ? 999 : 1,
    }),
  };
  if(props.nonCreatable){return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          variant="outlined"
          classes={classes}
          styles={selectStyles}
          inputId={props.id}
          TextFieldProps={{
            label: props.label,
            InputLabelProps: {
              htmlFor: props.id,
              shrink: true,
            },
            placeholder: 'Select...',
          }}
          options={Array.isArray(props.items) ? props.items : []}
          components={components}
          value={single}
          onChange={handleChangeSingle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={classes.divider} />
      </NoSsr>
    </div>
  );}else{
  return (
    <div className={classes.root}>
      <NoSsr>
        <CreatableSelect
          variant="outlined"
          classes={classes}
          styles={selectStyles}
          inputId={props.id}
          TextFieldProps={{
            label: props.label,
            InputLabelProps: {
              htmlFor: props.id,
              shrink: true,
            },
            placeholder: 'Select...',
          }}
          options={Array.isArray(props.items) ? props.items : []}
          components={components}
          value={single}
          onChange={handleChangeSingle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={classes.divider} />
      </NoSsr>
    </div>
  );}
}

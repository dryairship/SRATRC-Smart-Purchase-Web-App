import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  btn: {
    margin: theme.spacing(1),
    height: "70px",
    fontSize: "16px",
    textDecoration: "none",    
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            href="#inventory"
        >
          Inventory                                        
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            href="#payments"
        >
          Payments
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            href="#tally"
        >
          Tally Output  
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.btn}
            href="#donation"
        >
          Donation 
        </Button>
        
      </div>
    </Container>
  );
}
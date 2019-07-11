import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Avatar, Typography } from '@material-ui/core';
import StorageOutlinedIcon from '@material-ui/icons/StorageSharp';
import { AttachMoneyOutlined, ShoppingCartOutlined, SentimentSatisfiedAltOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    marginBottom: theme.spacing(0),
    height: "250px",
    fontSize: "16px",
    textDecoration: "none", 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  avatar: {
    margin: theme.spacing(1),
    fontSize:'4rem',
    width: 'auto',
    height:'auto',
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    fontSize: '0.8rem',
    marginTop: theme.spacing(1),
  }
}));

export default function HomePage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/inventory"
          >          
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <StorageOutlinedIcon fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6">              
                    Inventory
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Track inventory and transfer products
                  </Typography>
                </Grid>
              </Grid>                                    
          </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/payments"
          >          
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <AttachMoneyOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6">              
                    Payments
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Track installments and payments history
                  </Typography>
                </Grid>
              </Grid>                                    
          </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/purchase"
          >          
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <ShoppingCartOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6">              
                    Purchase
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Update details of a new purchase
                  </Typography>
                </Grid>
              </Grid>                                    
          </Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/donation"
          >          
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <SentimentSatisfiedAltOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6">              
                    Donation
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Update details of a donation
                  </Typography>
                </Grid>
              </Grid>                                    
          </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
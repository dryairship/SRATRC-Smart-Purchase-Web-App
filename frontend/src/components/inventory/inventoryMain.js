import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { ShoppingBasketOutlined, DomainOutlined, SwapHorizOutlined, UnarchiveOutlined, PlaylistAddOutlined, PlayForWorkOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    margin: theme.spacing(0),
    // marginLeft: theme.spacing(3),
    // marginRight: theme.spacing(10),
    height: "250px",
    // width: "14em",
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
    marginTop: theme.spacing(0),
    fontSize:'4rem',
    width: 'auto',
    height:'auto',
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    fontSize: '0.8rem',
    marginTop: theme.spacing(1),
  },
  btnName: {
    fontSize: '1.1rem'
  }
}));

export default function InventoryMainPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              className={classes.btn}
              href="/departmentinventory"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <DomainOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6" className={classes.btnName}>
                    Departmentwise Inventory
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Lists inventory by department and the products it contains
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              className={classes.btn}
              href="/productinventory"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <ShoppingBasketOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                <Typography component="h6" variant="h6" className={classes.btnName}>
                    Productwise Inventory
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Lists all departments containing a product
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/transfer"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <SwapHorizOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                <Typography component="h6" variant="h6" className={classes.btnName}>
                    Transfer Items
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Transfer your products to another department
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/checkout"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <UnarchiveOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                <Typography component="h6" variant="h6" className={classes.btnName}>
                    Checkout Items
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Mark items in the inventory as used
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/addStock"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <PlaylistAddOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                <Typography component="h6" variant="h6" className={classes.btnName}>
                    Add to current stock
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Add items to inventory without a payment
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/requestProduct"
            >
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <PlayForWorkOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                <Typography component="h6" variant="h6" className={classes.btnName}>
                    Request Products
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>
                    Ask for products from another department
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

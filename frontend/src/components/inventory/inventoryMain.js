import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { ShoppingBasketOutlined, DomainOutlined, SwapHorizOutlined, UnarchiveOutlined, PlaylistAddOutlined } from '@material-ui/icons';

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
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(10),
    height: "18em",
    width: "14em",
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

export default function InventoryMainPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
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
                  <Typography component="h6" variant="h6">
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
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
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
                  <Typography component="h6" variant="h6">
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
          <Grid item xs={6}>
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
                  <Typography component="h6" variant="h6">
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
          <Grid item xs={6}>
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
                  <Typography component="h6" variant="h6">
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
          <Grid item xs={6}>
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
                  <Typography component="h6" variant="h6">
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
        </Grid>
      </div>
    </Container>
  );
}

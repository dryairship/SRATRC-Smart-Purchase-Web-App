import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { HistoryOutlined, SentimentSatisfiedAltOutlined } from '@material-ui/icons';

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
    margin: theme.spacing(0),
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

export default function DonationMainPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
      <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/makedonation"
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
                    Make Donation
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Enter details of a new donation
                  </Typography>
                </Grid>
              </Grid>                                    
          </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.btn}
              href="/donationhistory"
          >          
              <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              >
                <Grid item>
                  <Avatar className={classes.avatar}>
                  <HistoryOutlined fontSize='inherit'/>
                </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h6" variant="h6">              
                    Donation history
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography align='center' className={classes.description}>              
                    Track donations history
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
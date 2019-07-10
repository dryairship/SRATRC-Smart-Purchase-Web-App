import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import DonationTable from './donationTable';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(1),
    }
  }));

export default function DonationHistory(props) {
    const classes = useStyles();

    return (
    <React.Fragment>
        <CssBaseline />        
        <div className={classes.paper}>
            <DonationTable />
        </div>
        
    </React.Fragment>
  );
}

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ContentsTable from './table';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

export default function Inventory() {
    const classes = useStyles();

    return (
    <React.Fragment>
        <CssBaseline />
        <Container 
        component="main"
        maxWidth="md"
        >
        <div className={classes.paper}>
            <ContentsTable />
        </div>
        </Container>
    </React.Fragment>
  );
}
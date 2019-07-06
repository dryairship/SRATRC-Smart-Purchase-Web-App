import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ContentsTable from './table';
import { Container } from '@material-ui/core';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function FilterTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (    
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Department" />
          <Tab label="Product" />
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}><ContentsTable /></TabContainer>
        <TabContainer dir={theme.direction}><ContentsTable /></TabContainer>
      </SwipeableViews> */}
      {value === 0 && <TabContainer><ContentsTable /></TabContainer>}
      {value === 1 && <TabContainer>The API documentation of the Tab React component. Learn more about the properties and the CSS customization points.The API documentation of the Tab React component. Learn more about the properties and the CSS customization points.The API documentation of the Tab React component. Learn more about the properties and the CSS customization points.The API documentation of the Tab React component. Learn more about the properties and the CSS customization points.</TabContainer>}
      </div>      
    </Container>
  );
}
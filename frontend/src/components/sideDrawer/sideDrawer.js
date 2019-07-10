import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailChild: {
    textDecoration: 'none',
    color: 'inherit',
  }
});

export default function SideDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, true)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <NavLink to="/" className={classes.link}>
                  <Typography>
                    Home
                  </Typography>
                </NavLink>                   
              </ExpansionPanelSummary>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary>
                <NavLink to="/inventory" className={classes.link}>
                  <Typography>
                    Inventory
                  </Typography>
                </NavLink>                   
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>                
                <NavLink to="/departmentinventory" className={classes.link}>
                  <ListItem 
                  divider 
                  button key="departmentinventory"
                  autoFocus="true">
                    Department Inventory
                  </ListItem>
                </NavLink>
                <NavLink to="/productinventory" className={classes.detailChild}>
                  <ListItem
                  divider 
                  button key="productinventory"
                  autoFocus="true">
                    Product Inventory
                  </ListItem>
                </NavLink>
                <NavLink to="/transfer" className={classes.detailChild}>
                  <ListItem
                  divider 
                  button key="departmentinventory"
                  autoFocus="true">
                    Transfer an Item
                  </ListItem>
                </NavLink>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <NavLink to="/payments" className={classes.link}>
                  <Typography>
                    Payments
                  </Typography>
                </NavLink>                   
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>                
                <NavLink to="/paymentsSummary" className={classes.link}>
                  <ListItem 
                  divider 
                  button key="paymentsSummary"
                  autoFocus="true">
                    Payments Summary
                  </ListItem>
                </NavLink>
                <NavLink to="/previousQuotations" className={classes.detailChild}>
                  <ListItem
                  divider 
                  button key="previousQuotations"
                  autoFocus="true">
                    Previous Quotations
                  </ListItem>
                </NavLink>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary>
                <NavLink to="/purchase" className={classes.link}>
                  <Typography>
                    Purchase
                  </Typography>
                </NavLink>                   
              </ExpansionPanelSummary>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary>
                <NavLink to="/donation" className={classes.link}>
                  <Typography>
                    Donation
                  </Typography>
                </NavLink>                   
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.details}>                
                <NavLink to="/makedonation" className={classes.link}>
                  <ListItem 
                  divider 
                  button key="makedonation"
                  autoFocus="true">
                    Make Donation
                  </ListItem>
                </NavLink>
                <NavLink to="/donationhistory" className={classes.detailChild}>
                  <ListItem
                  divider 
                  button key="donationhistory"
                  autoFocus="true">
                    Donation History
                  </ListItem>
                </NavLink>
              </ExpansionPanelDetails>
            </ExpansionPanel>
      </List>
    </div>
  );

  return (
    <div>
        <IconButton 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="Menu" 
            onClick={toggleDrawer('left', true)}
            >
            <MenuIcon />
        </IconButton>
      <Drawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        
      >
        {sideList('left')}
      </Drawer>
    </div>
  );
}
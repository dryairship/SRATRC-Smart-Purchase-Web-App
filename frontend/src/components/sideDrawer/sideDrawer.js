import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
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
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openPayments, setOpenPayments] = React.useState(false);
  const [openDonations, setOpenDonations] = React.useState(false);

  function handleClickInventory() {
    setOpenInventory(!openInventory);
  }
  function handleClickPayments() {
    setOpenPayments(!openPayments);
  }
  function handleClickDonations() {
    setOpenDonations(!openDonations);
  }

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
        <NavLink to="/" className={classes.link}>
          <ListItem 
          divider 
          button key="home"
          autoFocus="true">              
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>

        <NavLink to="/inventory" className={classes.link}>
          <ListItem button onClick={handleClickInventory} className={classes.link} divider>
            <ListItemText primary="Inventory" />
            {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            </NavLink>
            <Collapse in={openInventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>                
                <NavLink to="/departmentinventory" className={classes.detailChild} >
                  <ListItem                   
                    button key="departmentinventory"
                    style={{paddingLeft: '2rem'}}
                    autoFocus="true">
                    <ListItemText primary="Department Inventory" />                        
                  </ListItem>
                </NavLink>
                <NavLink to="/productinventory" className={classes.detailChild}>
                  <ListItem                   
                    button key="productinventory"
                    style={{paddingLeft: '2rem'}}
                    autoFocus="true">                    
                    <ListItemText primary="Product Inventory"/>
                  </ListItem>
                </NavLink>
                <NavLink to="/transfer" className={classes.detailChild}>
                  <ListItem
                    button key="transfer"
                    style={{paddingLeft: '2rem'}}
                    autoFocus="true">                    
                    <ListItemText primary="Transfer Items"/>
                  </ListItem>
                </NavLink>
                <NavLink to="/checkout" className={classes.detailChild}>
                  <ListItem
                  button key="checkout"
                    style={{paddingLeft: '2rem'}}
                  autoFocus="true">                    
                    <ListItemText primary="Checkout"/>                    
                  </ListItem>
                </NavLink>
                <NavLink to="/addStock" className={classes.detailChild}>
                  <ListItem
                  button key="addStock"
                  style={{paddingLeft: '2rem'}}
                  autoFocus="true">                    
                      <ListItemText primary="Add to Stock" />                    
                  </ListItem>
                </NavLink>
                <NavLink to="/requestProduct" className={classes.detailChild}>
                  <ListItem
                  button key="requestproducts"
                  style={{paddingLeft: '2rem'}}
                  autoFocus="true">                    
                    <ListItemText primary="Request Items" />                    
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            
            
            <NavLink to="/payments" className={classes.link}>
              <ListItem button onClick={handleClickPayments} className={classes.link} divider>
                <ListItemText primary="Payments" />
                {openPayments ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </NavLink>
              <Collapse in={openPayments} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>                
                  <NavLink to="/paymentsSummary" className={classes.detailChild} >
                    <ListItem                   
                      button key="paymentsSummary"
                      style={{paddingLeft: '2rem'}}
                      autoFocus="true">
                      <ListItemText primary="Payments Summary" />
                    </ListItem>
                  </NavLink>
                  <NavLink to="/previousQuotations" className={classes.detailChild}>
                    <ListItem                   
                      button key="previousQuotations"
                      style={{paddingLeft: '2rem'}}
                      autoFocus="true">                    
                      <ListItemText primary="Previous Quotations"/>
                    </ListItem>
                  </NavLink>                  
                </List>
              </Collapse>
            
            <NavLink to="/purchase" className={classes.link}>
              <ListItem button className={classes.link} divider>
                <ListItemText primary="Purchase" />
              </ListItem>
            </NavLink>

            <NavLink to="/donation" className={classes.link}>
              <ListItem button onClick={handleClickDonations} className={classes.link} divider>
                <ListItemText primary="Donation" />
                {openDonations ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </NavLink>
              <Collapse in={openDonations} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>                
                  <NavLink to="/makedonation" className={classes.detailChild} >
                    <ListItem                   
                      button key="makedonation"
                      style={{paddingLeft: '2rem'}}
                      autoFocus="true">
                      <ListItemText primary="Make Donation" />
                    </ListItem>
                  </NavLink>
                  <NavLink to="/donationhistory" className={classes.detailChild}>
                    <ListItem                   
                      button key="donationhistory"
                      style={{paddingLeft: '2rem'}}
                      autoFocus="true">                    
                      <ListItemText primary="Donation History"/>
                    </ListItem>
                  </NavLink>                  
                </List>
              </Collapse>

              <NavLink to="/help" className={classes.link}>
              <ListItem button className={classes.link} divider>
                <ListItemText primary="Help" />
              </ListItem>
            </NavLink>
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
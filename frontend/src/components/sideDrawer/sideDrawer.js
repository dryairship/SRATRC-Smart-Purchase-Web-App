import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from "react-router-dom";

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
  }
});

export default function SideDrawer() {
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
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
            <NavLink to="/" className={classes.link}>
              <ListItem 
              button key="Home"
              autoFocus="true"
              divider="true"
              >
                <ListItemText primary="Home"/>
              </ListItem>
            </NavLink>
            <NavLink to="/inventory" className={classes.link}>
              <ListItem 
              button key="inventory"
              autoFocus="true"
              >
                <ListItemText primary="Inventory"/>
              </ListItem>
            </NavLink>
            <NavLink to="/payments" className={classes.link}>
              <ListItem 
              button key="payments"
              autoFocus="true"
              >
                <ListItemText primary="Payments"/>
              </ListItem>
            </NavLink>
            <NavLink to="/tally" className={classes.link}>
              <ListItem 
              button key="tally"
              autoFocus="true"
              >
                <ListItemText primary="Tally Output"/>
              </ListItem>
            </NavLink>
            <NavLink to="/donation" className={classes.link}>
              <ListItem 
              button key="donation"
              autoFocus="true"
              >
                <ListItemText primary="Donation"/>
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
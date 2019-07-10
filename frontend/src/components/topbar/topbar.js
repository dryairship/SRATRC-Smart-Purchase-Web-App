import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SideDrawer from '../sideDrawer/sideDrawer';
import { NavLink } from "react-router-dom";
import { ListItem } from '@material-ui/core';
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorElright, setAnchorElright] = React.useState(null);
  const openright = Boolean(anchorElright);
  const [loggedIn, setLoggedIn] = React.useState(props.loggedIn);

  function handleMenuright(event) {
    setAnchorElright(event.currentTarget);
  }

  if(!loggedIn && Cookies.get('sessionID')){
    setLoggedIn(true);
  }
  
  function handleCloseright() {
    setAnchorElright(null);
    // setLoggedIn(!loggedIn);

  }  

  function logout() {
    fetch('/user/logout', {
      method: 'POST',
    });
  }

  if (loggedIn) {
    return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
            <div>
              <SideDrawer />              
            </div>            
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.link}>
              Centralized Inventory and Purchasing
            </NavLink>
          </Typography>          
            <div>
                <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuright}
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElright}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openright}
                onClose={handleCloseright}
                >
                <NavLink to="/profile" className={classes.link}>
                  <MenuItem>Profile</MenuItem>
                </NavLink>
                <NavLink to="/changePassword" className={classes.link}>
                  <MenuItem>Change Password</MenuItem>
                </NavLink>
                <NavLink to="/logout" className={classes.link}>
                  <MenuItem>Log Out</MenuItem>
                </NavLink>
                
                </Menu>
            </div>          
        </Toolbar>
      </AppBar>
    </div>   
  );} 
  else return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>         
          <Typography variant="h6" className={classes.title}>            
              Centralized Inventory and Purchasing
          </Typography> 
        </Toolbar>
      </AppBar>
    </div>   

  )
}

export default MenuAppBar;

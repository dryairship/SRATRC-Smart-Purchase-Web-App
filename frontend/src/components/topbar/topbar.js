import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SideDrawer from '../sideDrawer/sideDrawer';
import { Route, NavLink, HashRouter } from "react-router-dom";

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

function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorElright, setAnchorElright] = React.useState(null);
  const [anchorElleft, setAnchorElleft] = React.useState(null);
  const openright = Boolean(anchorElright);
  const openleft = Boolean(anchorElleft);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenuright(event) {
    setAnchorElright(event.currentTarget);
  }

  function handleCloseright() {
    setAnchorElright(null);
  }

  function handleMenuleft(event) {
    setAnchorElleft(event.currentTarget);
  }

  function handleCloseleft() {
    setAnchorElleft(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <div>
              <IconButton 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="Menu" 
                onClick={handleMenuleft}
                >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorElleft}
                keepMounted
                open={openleft}
                onClose={handleCloseleft}
              >
                <MenuItem onClick={handleCloseleft}>Profile</MenuItem>
                <MenuItem onClick={handleCloseleft}>My account</MenuItem>
                <MenuItem onClick={handleCloseleft}>Logout</MenuItem>
              </Menu>  
            </div>
            
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.link}>
              SRATRC
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
                <MenuItem onClick={handleCloseright}>Profile</MenuItem>                
                </Menu>
            </div>          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;
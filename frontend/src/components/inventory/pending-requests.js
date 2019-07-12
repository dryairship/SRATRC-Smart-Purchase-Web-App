import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ToysIconOutlined from '@material-ui/icons/ToysOutlined';
import SendIcon from '@material-ui/icons/Send';
import StarIcon from '@material-ui/icons/Star';

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  preAvatar: {
    backgroundColor: '#14a37f',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    marginBotton: theme.spacing(6),
  },
  hiddenError: {
    display: 'none',
  },
  visibleError: {
    display: 'block',
  },
  demo: {
  },
  list: {
    flexBasis: 'auto',
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(4),
  },
  deptTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: '1.2em',
  },
  listItem: {
    margin: theme.spacing(2),
    backgroundColor: '#14a37f',
    borderRadius: '10px',
  },
  actionButton: {
    marginLeft: theme.spacing(3),
    marginRight: 0,
    paddingRight: 0,
    paddingLeft: theme.spacing(3),
  },
}));

var onlyPending = true;

var haveFetchedRequests = false;
var haveFetchedDepartments = false;

export default function PendingRequests(props) {
  const classes = useStyles();

  const [fetchedRequests, setFetchedRequests] = React.useState([]);
  const [departments, setDepartments] = React.useState({});
  const userdept = localStorage.getItem('department');

  const fetchRequests = () => {
    haveFetchedRequests = true;
    fetch('/request')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setFetchedRequests(data);
    })
  };
  
  
  const fetchDepartments = () => {
    haveFetchedDepartments = true;
    fetch('/list/departments')
    .then(list => {
      return list.json();
    }).then(data => {
      data.items.unshift({value:'', label:''});
      var depts = data.items.reduce((map, dItem) => {
        map[dItem.value] = dItem.label;
        return map;
      });
      setDepartments(depts);
    });
  }
  
  const acceptRequest = (request) => {
    console.log(request);
    localStorage.setItem('requestToAccept', JSON.stringify(request));
    window.location.href='/acceptRequest';
  }
  
  
  haveFetchedDepartments || fetchDepartments();
  haveFetchedRequests || fetchRequests();

  const parseData = (array) => {
    return array;/*array.map(req =>
      React.cloneElement(element, {
        key: req._id,
      }),
    );*/
  }
  
  const getDepartmentNameFromID = (depID) => {
    return departments[depID];
  }
/*
  const generate = (element) {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
*/

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.heading}>
          {onlyPending? "Pending Product Requests" : "Product Requests"}
        </Typography>
          <div className={classes.demo}>
            <List dense={false} className={classes.list}>
              {fetchedRequests.map(req => {
                if(req.quantityRemaining.value>0)
                return (<ListItem className={classes.listItem}>
                  <div>
                    <a className={classes.deptTitle}>{getDepartmentNameFromID(req.departmentID)}</a> has requested <a className={classes.productTitle}>{req.productDetails.name}</a><br/>
                    Quantity Requested : <a className={classes.deptTitle}>{req.quantity.value+" "+req.quantity.unit}</a><br/>
                    Quantity Supplied : <a className={classes.deptTitle}>{(req.quantity.value-req.quantityRemaining.value)+" "+req.quantity.unit}</a><br/>
                    Quantity Remaining : <a className={classes.deptTitle}>{req.quantityRemaining.value+" "+req.quantity.unit}</a><br/>
                  </div>
                  <ListItemSecondaryAction className={classes.actionButton}>
                    {
                    req.departmentID==userdept?
                    <IconButton edge="end" aria-label="Cannot transfer item" disabled>
                      <StarIcon color="action"/>
                    </IconButton>
                     :
                    <IconButton edge="end" aria-label="Transfer Items" onClick={function(){acceptRequest(req);}}>
                      <SendIcon color="action"/>
                    </IconButton>
                    }
                  </ListItemSecondaryAction>
                </ListItem>
              );
              else return "";
              })}
            </List>
          </div>
      </div>
    </Container>
  );
}

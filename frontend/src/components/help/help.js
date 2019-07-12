import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Purchase from '../purchase/purchase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  twiceNested: {
      paddingLeft: theme.spacing(12),
  },
  text: {
      padding: theme.spacing(2),
      alignSelf: 'left',
  },
}));

export default function Help() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openDepartmentInventory, setOpenDepartmentInventory] = React.useState(false);
  const [openProductInventory, setOpenProductInventory] = React.useState(false);
  const [openTransfer, setOpenTransfer] = React.useState(false);
  const [openCheckout, setOpenCheckout] = React.useState(false);
  const [openAddInStock, setOpenAddInStock] = React.useState(false);
  const [openMakeRequest, setOpenMakeRequest] = React.useState(false);
  const [openPayments, setOpenPayments] = React.useState(false);
  const [openPaymentsSummary, setOpenPaymentsSummary] = React.useState(false);
  const [openPreviousQuotations, setOpenPreviousQuotations] = React.useState(false);
  const [openPurchase, setOpenPurchase] = React.useState(false);
  const [openDonation, setOpenDonation] = React.useState(false);
  const [openMakeDonation, setOpenMakeDonation] = React.useState(false);
  const [openDonationHistory, setOpenDonationHistory] = React.useState(false);
  const [openInventoryDesc, setOpenInventoryDesc] = React.useState(false);
  const [openDonationDesc, setOpenDonationDesc] = React.useState(false);
  const [openPaymentsDesc, setOpenPaymentsDesc] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleInventoryClick() {
      setOpenInventory(!openInventory);
  }

  function handleDepartmentInventory() {
      setOpenDepartmentInventory(!openDepartmentInventory);
  }

  function handleProductInventory() {
      setOpenProductInventory(!openProductInventory);
  }

  function handleTransfer() {
    setOpenTransfer(!openTransfer);
  }
  function handleCheckout() {
      setOpenCheckout(!openCheckout);
  }
  function handleAddInStock() {
      setOpenAddInStock(!openAddInStock);
  }
  function handleMakeRequest() {
      setOpenMakeRequest(!openMakeRequest);
  }
  function handlePayments() {
      setOpenPayments(!openPayments);
  }
  function handlePaymentsSummary() {
      setOpenPaymentsSummary(!openPaymentsSummary);
  }
  function handlePreviousQuotations() {
      setOpenPreviousQuotations(!openPreviousQuotations);
  }
  function handlePurchase() {
      setOpenPurchase(!openPurchase);
  }
  function handleDonation() {
      setOpenDonation(!openDonation);
  }
  function handleMakeDonation() {
      setOpenMakeDonation(!openMakeDonation);
  } 
  function handleDonationHistory() {
      setOpenDonationHistory(!openDonationHistory);
  }
  function handleOpenInventoryDesc() {
      setOpenInventoryDesc(!openInventoryDesc);
  }
  function handleOpenDonationDesc() {
      setOpenDonationDesc(!openDonationDesc);
  }
  function handlePaymentsDesc() {
      setOpenPaymentsDesc(!setOpenPaymentsDesc);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Help
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleInventoryClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
        {openInventory ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openInventory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={handleOpenInventoryDesc}>
                <ListItemIcon>
                <StarBorder />
                </ListItemIcon>
                <ListItemText primary="The inventory feature facilitates the user to track the items stored in the inventory of every department and insert, request or transfer items from the user’s department to some other departments." />
            </ListItem>
          <ListItem button className={classes.nested} onClick={handleDepartmentInventory}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Department Inventory" />
            {openDepartmentInventory ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openDepartmentInventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Section where a user can view inventory items department wise and can checkout, transfer or request items from other departments." />
                </ListItem>
            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handleProductInventory}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Product Inventory" />
            {openProductInventory ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openProductInventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="This section allows a user to keep track of a particular product in every department and request that particular product." />
                </ListItem>
            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handleTransfer}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Transfer" />
            {openTransfer ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openTransfer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary=" This is the section where a user can transfer items to some other department from his department’s inventory." />
                </ListItem>
            </List>
            </Collapse>
            <Collapse in={openInventory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={handleAddInStock}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Add In Stock" />
                    {openAddInStock ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </List>
            </Collapse>
            <Collapse in={openAddInStock} timeout="auto" unmountOnExit>
	            <List component="div" disablePadding>
	                <ListItem button className={classes.twiceNested}>
	                    <ListItemIcon>
	                    <StarBorder />
	                    </ListItemIcon>
	                    <ListItemText primary=" This section allows a user to add items to his department’s inventory." />
	                </ListItem>
	            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handleCheckout}>
	            <ListItemIcon>
	              <StarBorder />
	            </ListItemIcon>
	            <ListItemText primary="Checkout" />
	            {openCheckout ? <ExpandLess /> : <ExpandMore />}
         	</ListItem>
            <Collapse in={openCheckout} timeout="auto" unmountOnExit>
	            <List component="div" disablePadding>
	                <ListItem button className={classes.twiceNested}>
	                    <ListItemIcon>
	                    <StarBorder />
	                    </ListItemIcon>
	                    <ListItemText primary="User can checkout items for use in this section." />
	                </ListItem>
	            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handleMakeRequest}>
	            <ListItemIcon>
	              <StarBorder />
	            </ListItemIcon>
	            <ListItemText primary="Make Request" />
	            {openMakeRequest ? <ExpandLess /> : <ExpandMore />}
         	</ListItem>
            <Collapse in={openMakeRequest} timeout="auto" unmountOnExit>
	            <List component="div" disablePadding>
	                <ListItem button className={classes.twiceNested}>
	                    <ListItemIcon>
	                    <StarBorder />
	                    </ListItemIcon>
	                    <ListItemText primary=" A user can request items for his department, and the list will be visible to every other user." />
	                </ListItem>
	            </List>
            </Collapse>       

        </List>
      </Collapse>


      <ListItem button onClick={handlePayments}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Payments" />
        {openPayments ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPayments} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={handleOpenInventoryDesc}>
                <ListItemIcon>
                <StarBorder />
                </ListItemIcon>
                <ListItemText primary="The payments feature facilitates the user to view all payments made by his department, as well as add logs of the installments of every payment." />
            </ListItem>
          <ListItem button className={classes.nested} onClick={handlePaymentsSummary}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Payments Summary" />
            {openPaymentsSummary ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
            <Collapse in={openPaymentsSummary} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="This section displays a brief summary of the
payment details for all the purchases made by the department, and allows the user to pay pending amounts and view payment history. " />
                </ListItem>
            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handlePreviousQuotations}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Previous Quotations" />
            {openPreviousQuotations ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openPreviousQuotations} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary=" This section displays details of all purchases made by all the departments thus far." />
                </ListItem>
            </List>
            </Collapse>       

        </List>
      </Collapse>
      <ListItem button onClick={handlePurchase}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Purchase" />
        {openPurchase ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPurchase} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="This section allows the user to Make a Purchase and register it into the database." />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleDonation}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Donations" />
        {openDonation ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openDonation} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleOpenInventoryDesc}>
                <ListItemIcon>
                <StarBorder />
                </ListItemIcon>
                <ListItemText primary="This section facilitates the user to make a donation and view the history of donations made." />
            </ListItem>          
          <ListItem button className={classes.nested} onClick={handleMakeDonation}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Make A Donation" />
            {openMakeDonation ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openMakeDonation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary=" In this section a user can make or register a donation made by some donor, and items donated are inserted into his department’s inventory." />
                </ListItem>
            </List>
            </Collapse>
            <ListItem button className={classes.nested} onClick={handleDonationHistory}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Donations History" />
            {openDonationHistory ? <ExpandLess /> : <ExpandMore />}
         </ListItem>
            <Collapse in={openDonationHistory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.twiceNested}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="This section allows the user to view the history of donations made to his department." />
                </ListItem>
            </List>
            </Collapse>       

        </List>
      </Collapse>




    </List>
  );
}

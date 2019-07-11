import React from 'react';
import './App.css';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';
import DepartmentInventory from './components/inventory/departmentTable';
import ProductInventory from './components/inventory/productTable';
import Purchase from './components/purchase/purchase';
import ChangePassword from './components/changePassword/changePassword'
import DonationMain from './components/donation/donationMain';
import MakeDonation from './components/donation/donation';
import DonationHistory from './components/donation/donationHistory';
import InventoryMainPage from './components/inventory/inventoryMain';
import PaymentsMain from './components/payment/paymentMain';
import MakePayment from './components/payment/payment_entry'
import PaymentsSummary from './components/payment/payment';
import PaymentsHistory from './components/payment/payment_history';
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/signIn/signIn';
import Logout from './components/logout/logout';
import Profile from './components/profile/profile';
import Transfer from './components/inventory/transfer';
import RequestProduct from './components/inventory/request';
import AcceptRequest from './components/inventory/accept-request';
import PendingRequests from './components/inventory/pending-requests';
import Checkout from './components/inventory/checkout';
import AddStock from './components/inventory/add-stock';
import CreateUser from './components/createUser/createUser';
import PreviousQuotations from './components/payment/quotation';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const loginSuccessful = () => {
    setLoggedIn(true);
  }

  if(!loggedIn && Cookies.get('sessionID')){
    setLoggedIn(true);
  }

  if(loggedIn){
    return (
      <Router>
        <div className="App">
          <MenuAppBar/>
          <Route exact path="/" component={HomePage} />
          <Route path="/inventory" component={InventoryMainPage} />
          <Route path="/departmentinventory" component={DepartmentInventory} />
          <Route path="/productinventory" component={ProductInventory} />
          <Route path="/payments" component={PaymentsMain} />
          <Route path="/paymentsSummary" component={PaymentsSummary} />
          <Route path="/makePayment/:id" component={MakePayment} />
          <Route path="/paymentsHistory/:id" component={PaymentsHistory} />
          <Route path="/previousQuotations" component={PreviousQuotations} />
          <Route path="/donation" component={DonationMain} />
          <Route path="/makedonation" component={MakeDonation} />
          <Route path="/donationhistory" component={DonationHistory} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/purchase" component={Purchase} />
          <Route path="/profile" component={Profile} />
          <Route path="/pendingRequests" component={PendingRequests} />
          <Route path="/acceptRequest" component={AcceptRequest} />
          <Route path="/addUser" component={CreateUser} />
          <Route path="/transfer" component={Transfer} />
          <Route path="/requestProduct" component={RequestProduct} />
          <Route path="/addStock" component={AddStock} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout}/>
          <Route path="/help" component={HomePage}/>
        </div>
      </Router>
    );
  }else{
    return (
      <Router>
        <div className="App">
          <MenuAppBar/>
          <SignIn onLogin={loginSuccessful}/>
        </div>
      </Router>
    );
  }
}

export default App;

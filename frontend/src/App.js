import React from 'react';
import './App.css';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';
import DepartmentInventory from './components/inventory/department-inventory';
import ProductInventory from './components/inventory/product-inventory';
import Purchase from './components/purchase/purchase';
import ChangePassword from './components/changePassword/changePassword'
import Donation from './components/donation/donation'
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/signIn/signIn';
import Logout from './components/logout/logout';
import Profile from './components/profile/profile';
import Transfer from './components/inventory/transfer';
import CreateUser from './components/createUser/createUser';
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
          <MenuAppBar loggedIn={loggedIn} />
          <Route exact path="/" component={HomePage} />
          <Route path="/departmentInventory" component={DepartmentInventory} />
          <Route path="/productInventory" component={ProductInventory} />
          <Route path="/payments" component={HomePage} />
          <Route path="/donation" component={Donation} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/purchase" component={Purchase} />
          <Route path="/profile" component={Profile} />
          <Route path="/addUser" component={CreateUser} />
          <Route path="/transfer" component={Transfer} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }else{
    return (
      <Router>
        <div className="App">
          <SignIn onLogin={loginSuccessful}/>
        </div>
      </Router>
    );
  }
}

export default App;

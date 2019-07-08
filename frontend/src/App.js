import React from 'react';
import './App.css';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';
import Inventory from './components/inventory/inventory';
import Purchase from './components/purchase/purchase';
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/signIn/signIn';
import Profile from './components/profile/profile';
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
          <Route path="/inventory" component={Inventory} />
          <Route path="/payments" component={HomePage} />
          <Route path="/donation" component={HomePage} />
          <Route path="/purchase" component={Purchase} />
          <Route path="/profile" component={Profile} />
          <Route path="/addUser" component={CreateUser} />
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

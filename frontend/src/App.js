import React from 'react';
import './App.css';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';
import Inventory from './components/inventory/inventory';
import { Route, HashRouter } from "react-router-dom";
import SignIn from './components/signIn/signIn';
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
      <HashRouter>
        <div className="App">
          <MenuAppBar />
          <Route exact path="/" component={HomePage} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/payments" component={HomePage} />
          <Route path="/tally" component={HomePage} />
          <Route path="/donation" component={HomePage} />
        </div>
      </HashRouter>
    );
  }else{
    return (
      <HashRouter>
        <div className="App">
          <SignIn onLogin={loginSuccessful}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';
import Inventory from './components/inventory/inventory';
import { Route, HashRouter } from "react-router-dom";
import SignIn from './components/signIn/signIn';

function App() {
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
}

export default App;
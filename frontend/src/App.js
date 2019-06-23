import React from 'react';
import './App.css';
import SignIn from './components/signIn/signIn';
import MenuAppBar from './components/topbar/topbar';
import HomePage from './components/homepage/homepage';

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <HomePage />
    </div>
  );
}

export default App;

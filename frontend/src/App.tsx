import React from 'react';
import logo from './logo.svg';
import './App.scss';

import LoginView from './components/login';

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center">
      <LoginView/>
    </div>
  );
}

export default App;

import React from 'react';
import './resources/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import TestRequest from './components/button';

function App() {
  return (
    <div className="App">
      <Header/>
      <TestRequest/>
    </div>
  );
}

export default App;

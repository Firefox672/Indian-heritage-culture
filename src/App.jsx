import React from 'react';
import Routing from './components/Routing';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="background-overlay">
        <div className="background-blob blob-1"></div>
        <div className="background-blob blob-2"></div>
        <div className="background-blob blob-3"></div>
      </div>
      <Routing />
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import ScenesContainer from './components/ScenesContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App header">
          <h1>Story Board</h1>
        </div>
        <ScenesContainer />
      </div>
    );
  }
}

export default App;

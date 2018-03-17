import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import List from './components/List';
// import ResetButton from './components/ResetButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <List />
      </div>
    );
  }
}

export default App;

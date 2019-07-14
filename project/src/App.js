import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const makeTestRequest = () => {
  axios.get('https://google.com').then(response => {
    debugger;
    console.info(`response is: ${JSON.stringify(response)}`);
  }).catch(error => {
    debugger;
    console.error(`error is: ${JSON.stringify(error)}`);
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={makeTestRequest}>Click me to test Axios!</button>
      </header>
    </div>
  );
}

export default App;

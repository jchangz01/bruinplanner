import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function PathNotFound() {
  return (
    <h3>Error 404 - Page Not Found!</h3>
  )
}

function App() {
  return (
    /*<Switch>
      
    </Switch>
    */
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
      </header>
    </div>
  );
}

export default App;

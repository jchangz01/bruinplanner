import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function PathNotFound() {
  return (
    <h3>Error 404 - Page Not Found!</h3>
  )
}

export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={PathNotFound} />
      </Switch>
    </main>
  );
}


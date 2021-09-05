import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shard/Navigation';
import PhoneEmailStep from './pages/Steps/PhoneEmailStep';
import Authenticate from './pages/Authenticate';
import AccountActivate from './pages/AccountActivate';
import GuestRoute from './components/Routes/GuestRoute';
import Rooms from './pages/Rooms';

function App() {
  return (
    <Router>
      <Navigation/>

      <Switch>
        <GuestRoute path="/" exact>
            <Home />
        </GuestRoute>
        
        <GuestRoute path="/authenticate" exact>
            <Authenticate />
        </GuestRoute>

        <Route path="/activate" exact>
            <AccountActivate />
        </Route>

        <Route path="/rooms" exact>
            <Rooms/>
        </Route>

      </Switch> 
    
    </Router>
  );
}

export default App;

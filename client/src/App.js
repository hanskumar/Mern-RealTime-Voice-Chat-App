import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shard/Navigation';
import PhoneEmailStep from './pages/Steps/PhoneEmailStep';
import Authenticate from './pages/Authenticate';
import AccountActivate from './pages/AccountActivate';
import GuestRoute from './components/Routes/GuestRoute';
import SemiProtectedRoute from './components/Routes/SemiProtectedRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';

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

        {/* <SemiProtectedRoute path="/activate" exact>
            <AccountActivate />
        </SemiProtectedRoute> */}

        <Router path="/activate" exact>
            <AccountActivate />
        </Router>

        <ProtectedRoute path="/rooms" exact>
            <Rooms/>
        </ProtectedRoute>

        <ProtectedRoute path="/profile" exact>
            <Rooms/>
        </ProtectedRoute>

      </Switch> 
    
    </Router>
  );
}

export default App;

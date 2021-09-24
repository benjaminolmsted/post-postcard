import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" 
import { useState } from 'react'


function App() {
  const [user, setUser] = useState(false)

  return (
    <Router>
      <Switch> 
        <Route path='/login'>
          <Login setUser={setUser}/>
        </Route>
        <Route path='/signup'>
          <Signup setUser={setUser}/>
        </Route>
        <Route path='/'>
          <Home setUser={setUser} user={user}/>
        </Route>
      </Switch>  
    </Router>
  );
}

export default App;

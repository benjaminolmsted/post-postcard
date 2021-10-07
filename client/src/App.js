import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" 
import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const promise = loadStripe("pk_test_51Jgvu1Ixf5MifhQmkHHDjOy2NfvTX32tgXHBstEvXnh1xt5iC0G7z4N6T9bqP7VNOOMRyNrNs5X1P32cPymXnCl800TF8DvnHj");

const theme = createTheme({
  palette: {
    primary: {
      main: '#c5c5c5',
    },
    secondary: {
      main: '#FF00FF',
    }
  },components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius: '0px'
        },
      },
    },
  },
})


function App() {
  const [user, setUser] = useState(false)

  return (
    <Elements stripe={promise}>
    <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Elements>
  );
}

export default App;

import React, { useContext, useState } from 'react';
import './App.css';
import Login from './components/Login';
import AuthContext from './authContext';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App () {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const setTokenInLocalStorage = (token) => {
    localStorage.setItem('authToken', token)
    setToken(token)
  }

  let userNameFromToken = null
  if (token) {
    userNameFromToken = jwtDecode(token).name || null
  }


  return (
    <AuthContext.Provider value={{token, setToken: setTokenInLocalStorage}}>
      <Router>
        <div className="App">
        {!!token  && <Navbar />}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/register">
              <Register />
            </PrivateRoute>
            <PrivateRoute path="/">
              <div>
                pagz d'accueil
              </div>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
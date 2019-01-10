import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch , Redirect} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import PlanetList from './PlanetList';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRouter';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Switch>
            {/* A user can't go to the HomePage if is not authenticated */}
            <PrivateRoute path="/" component={PlanetList} exact />
            <LoginRoute path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

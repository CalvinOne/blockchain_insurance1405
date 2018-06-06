import './App.css'
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './views/Login'
import Main from './layout/Main'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/login'/>
          <Route path='/login' component={Login}/>
          <Route path='/index' component={Main}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
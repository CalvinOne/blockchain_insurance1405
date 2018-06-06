import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from './views/Index'

const RouterConfig = ({ match, showAlert }) => (
  <Switch>
    <Route path={match.url} render={props => (<Index showAlert={showAlert} {...props} />)}></Route>
  </Switch>
)

export default RouterConfig
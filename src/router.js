import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from './views/Index'

const RouterConfig = ({ match, ...rest }) => (
  <Switch>
    <Route path={match.url} render={props => (<Index {...rest} {...props} />)}></Route>
  </Switch>
)

export default RouterConfig
import './App.css'
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './views/Login'
import Main from './layout/Main'

import contract from 'truffle-contract'
import CreditContract from '../build/contracts/Credit.json'
import getWeb3 from './utils/getWeb3'

function withWeb3(WrappedComponent, options) {
  return class extends WrappedComponent {
    render () {
      return <WrappedComponent {...this.props} {...options}></WrappedComponent>
    }
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      web3: null,
      Credit: null,
      account: null
    }
  }
  
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }
  
  instantiateContract () {
    const Credit = contract(CreditContract)
    Credit.setProvider(this.state.web3.currentProvider)
    this.setState({
      Credit
    })

    // Get the initial account balance so it can be displayed.
    this.state.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accounts.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      this.setState({
        account: accounts[0]
      })
    });
  }
  
  render() {
    const HighLogin = withWeb3(Login, this.state)
    const HighMain = withWeb3(Main, this.state)
    return (
      <Router>
        <Switch>
          <Route path='/login' component={HighLogin}/>
          <Route path='/index' component={HighMain}/>
          <Redirect from='/' to='/login'/>
        </Switch>
      </Router>
    );
  }
}

export default App;
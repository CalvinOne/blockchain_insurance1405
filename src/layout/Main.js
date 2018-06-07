import React, { Component } from 'react';
import Nav from '../common/Nav'
import Router from '../router'
import { Alert } from 'react-bootstrap'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alertShow: false,
      alert: {
        type: '',
        message: ''
      }
    }
  }

  showAlert = ({type, message}) => {
    this.setState({
      alert: {
        type,
        message
      }
    })
    this.setState({
      alertShow: true
    })
    setTimeout(() => {
      this.setState({
        alertShow: false
      })
    }, 2000)
  }

  render() {
    return (
      <div id="wrapper" className="top-navigation">
        <div id="page-wrapper">
          <Nav account={this.props.account}></Nav>
          {this.state.alertShow ? 
            (<div className="row animated slideInDown">
              <Alert bsStyle={this.state.alert.type}>
                {this.state.alert.message}
              </Alert>
             </div>) : null}
          <div className="wrapper wrapper-content">
            <div className="container">
              <Router match={this.props.match} showAlert={this.showAlert} {...{web3: this.props.web3, account: this.props.account, Credit:this.props.Credit}}></Router>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
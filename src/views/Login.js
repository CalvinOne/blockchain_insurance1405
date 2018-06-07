import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import toastr from 'toastr'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      role: 0
    };
  }

  handleRadioChange = (e) => {
    this.setState({
      role: parseInt(e.target.value, 10)
    })
  }
  
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    toastr.options.onHidden = () => { this.props.history.push('/index') }
    toastr.options.progressBar = true
    if (!this.state.value) return
    this.props.Credit.deployed().then((instance) => {
        return instance.registerParty(this.state.value, this.state.role, {from: this.props.account});
    }).then(function(){
       toastr.success('即将跳转到首页...', '恭喜！注册成功')
    }).catch(function(e){
      console.log(e);
    });
  }

  render() {
    const roles = [
      'provider',
      'petient',
      'payer'
    ]
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">M+</h1>
          </div>
          <h3>Welcome to block chain medical system</h3>
          <form className="m-t" role="form" onSubmit={this.handleSubmit}>
            <FormGroup controlId="address">
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="address"
                onChange={this.handleChange}
              />
            </FormGroup>
            <p className="text-muted text-center">
              <small>Choose your job?</small>
            </p>
            <FormGroup validationState="success">
              {roles.map((role, index) =>
                <div className="radio radio-info radio-inline" key={ role }>
                  <input
                    type="radio"
                    id={ role }
                    name="roleRadio"
                    value={ index }
                    checked={ this.state.role === index }
                    onChange={this.handleRadioChange}
                  />
                  <label htmlFor={ role }> { role } </label>
                </div>
              )}
            </FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              className="full-width m-b"
              block
            >
              Login
            </Button>
          </form>
          <p className="m-t">
            <small>
              Cool Block Chain Webapp &copy; 2018
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
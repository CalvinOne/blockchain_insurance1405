import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      role: 'provider'
    };
  }

  handleRadioChange = (e) => {
    console.log(e.target)
    this.setState({
      role: e.target.value
    })
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
          <form className="m-t" role="form">
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
              {roles.map((role) =>
                <div className="radio radio-info radio-inline" key={ role }>
                  <input
                    type="radio"
                    id={ role }
                    name="roleRadio"
                    value={ role }
                    checked={ this.state.role === role }
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
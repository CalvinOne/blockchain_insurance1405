import React, { Component } from "react";
import Box from "../common/Box";
import { FormGroup, FormControl, Button, ControlLabel, HelpBlock, Modal } from "react-bootstrap"

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      <FormControl.Feedback />
      {help && validationState === 'error' && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        identity: '',
        name: '',
        category: '',
        price: ''
      },
      modal: {
        show: false
      },
      blockInfo: [
        [],
        []
      ]
    }
  }

  getValidationState = (value) => {
      if (value) return 'success'
      return 'error'
  }

  handleChange = (event) => {
    const f = Object.assign({}, this.state.form, {
      [event.target.id]: event.target.value
    })
    this.setState({
      form: f
    })
  }

  handleSubmit = (event) => {
     event.preventDefault();
     try {
        Object.keys(this.state.form).forEach((element, index) => {
          if (!this.state.form[element]) throw new Error();
        });

        this.props.Credit.deployed().then((instance) => {
          const { identity, name, category, price } = this.state.form
          return instance.create(identity, name, category, price, {from: this.props.account});
        }).then(() => {
          this.props.showAlert({
            type: 'success',
            message: '提交成功'
          })
        }).catch((e) => {
          console.log(e)
          this.props.showAlert({
            type: 'danger',
            message: e.message
          })
        });
     } catch(e) {
      console.log('不能提交')
     }
  }

  getInfo = () => {
    const deployed = this.props.Credit.deployed()
    const blockInfo = deployed.then((instance) => {
          return instance.all.call({from: this.props.account});
    })
    const message = deployed.then((instance) => {
        return instance.setCurrentBlockNum.call({from: this.props.account});
    })
    Promise.all([blockInfo, message])
      .then((result) => {
        this.setState({
          modal: {
            show: true
          },
          blockInfo: result
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <Box title={<h5>block chain medical system</h5>}>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="identity"
            type="text"
            label="ID"
            placeholder="Enter your id"
            value={this.state.form.identity}
            onChange={this.handleChange}
            validationState={this.getValidationState(this.state.form.identity)}
            help="id is required"
          />
          <FieldGroup
            id="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
            value={this.state.form.name}
            onChange={this.handleChange}
            validationState={this.getValidationState(this.state.form.name)}
            help="name is required"
          />
          <FieldGroup
            id="category"
            type="text"
            label="Name_Illness"
            placeholder="Enter your Name_Illness"
            value={this.state.form.category}
            onChange={this.handleChange}
            validationState={this.getValidationState(this.state.form.category)}
            help="illness is required"
          />
          <FieldGroup
            id="price"
            type="text"
            label="Amount_Should_Pay"
            placeholder="Enter the amount you should pay"
            value={this.state.form.price}
            onChange={this.handleChange}
            validationState={this.getValidationState(this.state.form.price)}
            help="pay amount is required"
          />
          <div className="hr-line-dashed"></div>
          <FormGroup>
            <Button type="submit">Submit</Button>
            <Button bsStyle="primary" onClick={this.getInfo}>GetInfo</Button>
          </FormGroup>
        </form>
        <Modal show={this.state.modal.show} className="inmodal">
          <Modal.Header>
            <Modal.Title>Infos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <strong>block info</strong>
              <ul className="list-group clear-list">
                  <li className="list-group-item fist-item">
                      <span className="pull-right">{this.state.blockInfo[0][0]}</span>
                      ID
                  </li>
                  <li className="list-group-item">
                      <span className="pull-right">{this.state.blockInfo[0][1]}</span>
                      Name
                  </li>
                  <li className="list-group-item">
                      <span className="pull-right">{this.state.blockInfo[0][2]}</span>
                      Name_Illness
                  </li>
                  <li className="list-group-item">
                      <span className="pull-right">{this.state.blockInfo[0][3] && (this.state.blockInfo[0][3]).toString()}</span>
                      Pay
                  </li>
              </ul>
            </div>
            <div>
              <strong>message</strong>
              <ul className="list-group clear-list">
                  <li className="list-group-item fist-item">
                      <span className="pull-right">{this.state.blockInfo[1][0] && (this.state.blockInfo[1][0]).toString()}</span>
                      block number
                  </li>
                  <li className="list-group-item">
                      <span className="pull-right">{this.state.blockInfo[1][1]}</span>
                      Address
                  </li>
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={() => this.setState({modal: {show: false}})}>确定</Button>
          </Modal.Footer>
        </Modal>
      </Box>
    );
  }
}

export default Index;
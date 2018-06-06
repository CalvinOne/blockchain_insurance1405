import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import pace from '../vendor/pace'
import { Link } from "react-router-dom";

class Nav extends Component {
  componentDidMount() {
    pace.start()
  }

  render() {
    return (
      <div className="row border-bottom white-bg">
        <Navbar staticTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/index">M+</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>
              Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
            </Navbar.Text>
            <Navbar.Text pullRight>Have a great day!</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Nav;
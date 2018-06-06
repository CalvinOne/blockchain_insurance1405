import React, { Component } from "react";

class Box extends Component {
  render() {
    return (
      <div className="ibox">
          <div className="ibox-title">
              {this.props.title}
          </div>
          <div className="ibox-content">
              {this.props.children}
          </div>
      </div>
    );
  }
}

export default Box;
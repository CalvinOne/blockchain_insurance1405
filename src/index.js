import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/font-awesome/css/font-awesome.css";
import "./../node_modules/animate.css";
import "./styles/style.css";
import './styles/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
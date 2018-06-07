import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "animate.css";
import 'toastr/build/toastr.css'
import './styles/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'
import "./styles/style.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
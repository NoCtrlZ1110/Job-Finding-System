import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import { AuthProvider } from "./services/store";

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/assets/css/main.css";
import "../src/assets/vendor/themify-icons/themify-icons.css";
import "../src/assets/vendor/fontawesome/css/font-awesome.min.css";
import "../src/assets/vendor/bootstrap-multiselect/bootstrap-multiselect.css";
import "../src/assets/vendor/parsleyjs/css/parsley.css";
import "../src/assets/css/loader.css";
import "../src/assets/css/modal.css";

import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

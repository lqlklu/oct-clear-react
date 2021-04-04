import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "antd/dist/antd.css";

import { App } from "./components/app";
import reportWebVitals from "./reportWebVitals";
import { rootStore } from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={rootStore}>
    <App store={rootStore} />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

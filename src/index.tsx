import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./containers/app/App";
import { history, store } from "./store/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import QuestionCreator from "./QuestionCreator";
import { createReduxStore } from "./redux/store";

import "meyer-reset-scss/reset.scss";

const store = createReduxStore();
const questionCreator = new QuestionCreator(store);

ReactDOM.render(
  <Provider store={store}>
    <App questionCreator={questionCreator} />
  </Provider>,
  document.getElementById("root")
);

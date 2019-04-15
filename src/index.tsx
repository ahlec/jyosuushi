import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { Provider } from "react-redux";

import App from "./App";
import QuizManager from "./QuizManager";
import { createReduxStore } from "./redux/store";

import "meyer-reset-scss/reset.scss";

const store = createReduxStore();
const quizManager = new QuizManager(store);

Modal.setAppElement(document.getElementById("root")!);

ReactDOM.render(
  <Provider store={store}>
    <App quizManager={quizManager} />
  </Provider>,
  document.getElementById("root")
);

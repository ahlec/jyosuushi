import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import QuestionManager from "./QuestionManager";
import { createReduxStore } from "./redux/store";

import "meyer-reset-scss/reset.scss";

const store = createReduxStore();

ReactDOM.render(
  <Provider store={store}>
    <QuestionManager>
      {askNewQuestion => <App askNewQuestion={askNewQuestion} />}
    </QuestionManager>
  </Provider>,
  document.getElementById("root")
);

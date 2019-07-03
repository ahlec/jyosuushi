import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactGA from "react-ga";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import QuizManager from "./QuizManager";
import { createRedux } from "./redux/store";

import "meyer-reset-scss/reset.scss";

ReactGA.initialize(CONFIG_GOOGLE_ANALYTICS_TRACKING_ID, {
  gaOptions: {
    siteSpeedSampleRate: 100
  }
});

const redux = createRedux();
const quizManager = new QuizManager(redux.store);

Modal.setAppElement(document.getElementById("root")!);

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate loading={null} persistor={redux.persistor}>
      <BrowserRouter>
        <App quizManager={quizManager} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

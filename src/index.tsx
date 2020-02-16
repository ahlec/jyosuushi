import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactGA from "react-ga";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import QuizManagerContext from "./quiz/context";
import QuizManager from "./quiz/QuizManager";
import { createRedux } from "./redux/store";
import Container from "./ui/Container";

import "meyer-reset-scss/reset.scss";
import "./index.scss";

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
      <QuizManagerContext.Provider value={quizManager}>
        <Container />
      </QuizManagerContext.Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

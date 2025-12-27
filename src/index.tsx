import * as React from "react";
import { createRoot } from "react-dom/client";
import * as ReactGA from "react-ga";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";

import IntlProvider from "./i18n/IntlProvider";
import QuizManagerContext from "./ui/modules/quiz/state/context";
import QuizManager from "./ui/modules/quiz/state/QuizManager";
import { createRedux } from "./redux/store";
import Container from "./ui/Container";

import "./reset.scss";
import "./index.scss";

ReactGA.initialize(CONFIG_GOOGLE_ANALYTICS_TRACKING_ID, {
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
});

const redux = createRedux();
const quizManager = new QuizManager(redux.store);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Unable to find root element to hook into");
}

Modal.setAppElement(rootElement);
const root = createRoot(rootElement);

root.render(
  <Provider store={redux.store}>
    <PersistGate loading={null} persistor={redux.persistor}>
      <IntlProvider>
        <BrowserRouter>
          <QuizManagerContext.Provider value={quizManager}>
            <Container />
          </QuizManagerContext.Provider>
        </BrowserRouter>
      </IntlProvider>
    </PersistGate>
  </Provider>,
);

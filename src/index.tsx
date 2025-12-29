import { PostHogProvider } from "posthog-js/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";

import IntlProvider from "./i18n/IntlProvider";
import { QuizManagerProvider } from "./ui/modules/quiz/state/context";
import { createRedux } from "./redux/store";
import Container from "./ui/Container";

import "./reset.scss";
import "./index.scss";

const redux = createRedux();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Unable to find root element to hook into");
}

Modal.setAppElement(rootElement);
const root = createRoot(rootElement);

root.render(
  <PostHogProvider
    apiKey={CONFIG_POSTHOG_API_KEY}
    options={{
      api_host: CONFIG_POSTHOG_API_HOST,
      defaults: "2025-11-30",
    }}
  >
    <Provider store={redux.store}>
      <PersistGate loading={null} persistor={redux.persistor}>
        <IntlProvider>
          <BrowserRouter>
            <QuizManagerProvider reduxStore={redux.store}>
              <Container />
            </QuizManagerProvider>
          </BrowserRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>
  </PostHogProvider>,
);

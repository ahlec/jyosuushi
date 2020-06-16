import {
  Action,
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch,
  Store as ReduxStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import {
  createMigrate,
  Persistor,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import enabledPacksReducer from "./reducers/enabledPacks";
import questionsReducer from "./reducers/questions";
import quizStateReducer from "./reducers/quizState";
import scorecardReducer from "./reducers/scorecard";
import settingsReducer from "./reducers/settings";
import userReducer from "./reducers/user";
import userAnswersReducer from "./reducers/userAnswers";

import migrateV0 from "./migration/v0";
import migrateV1 from "./migration/v1";

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

interface Redux {
  store: Store;
  persistor: Persistor;
}

export function createRedux(): Redux {
  const reducers = combineReducers<State>({
    counters: countersReducer,
    enabledPacks: enabledPacksReducer,
    questions: questionsReducer,
    quizState: quizStateReducer,
    scorecard: scorecardReducer,
    settings: settingsReducer,
    user: userReducer,
    userAnswers: userAnswersReducer,
  });
  const store = createStore<State, Action, unknown, unknown>(
    persistReducer(
      {
        key: "root",
        migrate: createMigrate({
          0: migrateV0,
          1: migrateV1,
        }),
        storage,
        version: 1,
      },
      reducers
    ),
    composeWithDevTools()
  );
  const persistor = persistStore(store);
  return {
    persistor,
    store,
  };
}

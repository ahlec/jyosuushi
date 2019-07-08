import {
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch,
  Store as ReduxStore
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import {
  createMigrate,
  Persistor,
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import enabledPacksReducer from "./reducers/enabledPacks";
import itemsReducer from "./reducers/items";
import questionsReducer from "./reducers/questions";
import quizStateReducer from "./reducers/quizState";
import scorecardReducer from "./reducers/scorecard";
import settingsReducer from "./reducers/settings";
import userReducer from "./reducers/user";
import userAnswersReducer from "./reducers/userAnswers";

import migrateV0 from "./migration/v0";

type Action = any;

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
    items: itemsReducer,
    questions: questionsReducer,
    quizState: quizStateReducer,
    scorecard: scorecardReducer,
    settings: settingsReducer,
    user: userReducer,
    userAnswers: userAnswersReducer
  });
  const store = createStore<State, Action, any, any>(
    persistReducer(
      {
        key: "root",
        migrate: createMigrate({
          0: migrateV0
        }),
        storage,
        version: 0
      },
      reducers
    ),
    composeWithDevTools()
  );
  const persistor = persistStore(store);
  return {
    persistor,
    store
  };
}

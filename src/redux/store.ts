import {
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch,
  Store as ReduxStore
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import currentQuestionReducer from "./reducers/currentQuestion";
import enabledPacksReducer from "./reducers/enabledPacks";
import itemsReducer from "./reducers/items";
import quizStateReducer from "./reducers/quizState";
import scorecardReducer from "./reducers/scorecard";
import settingsReducer from "./reducers/settings";

type Action = any;

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export function createReduxStore(): Store {
  return createStore<State, Action, any, any>(
    combineReducers<State>({
      counters: countersReducer,
      currentQuestion: currentQuestionReducer,
      enabledPacks: enabledPacksReducer,
      items: itemsReducer,
      quizState: quizStateReducer,
      scorecard: scorecardReducer,
      settings: settingsReducer
    }),
    composeWithDevTools()
  );
}

import { combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import currentQuestionReducer from "./reducers/currentQuestion";
import itemsReducer from "./reducers/items";
import scorecardReducer from "./reducers/scorecard";
import settingsReducer from "./reducers/settings";

type Action = any;

export type SiteStore = Store<State, Action>;
// export type SiteDispatch = ThunkDispatch<IState, void, Action>;

export function createReduxStore(): SiteStore {
  return createStore<State, Action, any, any>(
    combineReducers<State>({
      counters: countersReducer,
      currentQuestion: currentQuestionReducer,
      items: itemsReducer,
      scorecard: scorecardReducer,
      settings: settingsReducer
    }),
    composeWithDevTools()
  );
}

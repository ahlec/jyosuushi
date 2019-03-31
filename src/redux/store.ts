import {
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch,
  Store
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import currentQuestionReducer from "./reducers/currentQuestion";
import enabledPacksReducer from "./reducers/enabledPacks";
import itemsReducer from "./reducers/items";
import scorecardReducer from "./reducers/scorecard";
import settingsReducer from "./reducers/settings";

type Action = any;

export type SiteStore = Store<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
// export type SiteDispatch = ThunkDispatch<IState, void, Action>;

export function createReduxStore(): SiteStore {
  return createStore<State, Action, any, any>(
    combineReducers<State>({
      counters: countersReducer,
      currentQuestion: currentQuestionReducer,
      enabledPacks: enabledPacksReducer,
      items: itemsReducer,
      scorecard: scorecardReducer,
      settings: settingsReducer
    }),
    composeWithDevTools()
  );
}

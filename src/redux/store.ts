import { combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { State } from "./index";

import settingsReducer from "./reducers/settings";

type Action = any;

export type SiteStore = Store<State, Action>;
// export type SiteDispatch = ThunkDispatch<IState, void, Action>;

export function createReduxStore(): SiteStore {
  return createStore<State, Action, any, any>(
    combineReducers<State>({
      settings: settingsReducer
    }),
    composeWithDevTools()
  );
}

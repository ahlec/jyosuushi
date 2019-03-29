import { ActionSetLocalizationLanguage } from "../actions";
import { Counter } from "../index";

interface State {
  [counterId: string]: Counter;
}

type ReducerAction = ActionSetLocalizationLanguage;

export default function countersReducer(
  state: State | undefined = {},
  action: ReducerAction
): State {
  switch (action.type) {
    default:
      return state;
  }
}

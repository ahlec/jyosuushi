import { ActionSetLocalizationLanguage } from "../actions";
import { Question } from "../index";

type ReducerAction = ActionSetLocalizationLanguage;

export default function currentQuestionReducer(
  state: Question | null | undefined = null,
  action: ReducerAction
): Question | null {
  switch (action.type) {
    default:
      return state;
  }
}

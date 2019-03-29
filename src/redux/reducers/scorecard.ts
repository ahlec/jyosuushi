import { ActionSetLocalizationLanguage } from "../actions";
import { Scorecard } from "../index";

type ReducerAction = ActionSetLocalizationLanguage;

const DEFAULT_SCORECARD: Scorecard = {
  numCorrectAnswers: 0,
  numQuestionsAsked: 0
};

export default function scorecardReducer(
  state: Scorecard | undefined = DEFAULT_SCORECARD,
  action: ReducerAction
): Scorecard {
  switch (action.type) {
    default:
      return state;
  }
}

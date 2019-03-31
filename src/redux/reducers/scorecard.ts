import { ActionChangeStudyPacks } from "../actions";
import { Scorecard } from "../index";

type ReducerAction = ActionChangeStudyPacks;

const DEFAULT_SCORECARD: Scorecard = {
  numCorrectAnswers: 0,
  numQuestionsAsked: 0
};

export default function scorecardReducer(
  state: Scorecard | undefined = DEFAULT_SCORECARD,
  action: ReducerAction
): Scorecard {
  switch (action.type) {
    case "change-study-packs":
      return DEFAULT_SCORECARD;
    default:
      return state;
  }
}

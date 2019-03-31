import {
  ActionChangeStudyPacks,
  ActionMarkCorrectAnswer,
  ActionMarkIncorrectAnswer
} from "../actions";
import { Scorecard } from "../index";

type ReducerAction =
  | ActionChangeStudyPacks
  | ActionMarkCorrectAnswer
  | ActionMarkIncorrectAnswer;

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
    case "mark-correct-answer": {
      return {
        numCorrectAnswers: state.numCorrectAnswers + 1,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    }
    case "mark-incorrect-answer": {
      return {
        numCorrectAnswers: state.numCorrectAnswers,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    }
    default:
      return state;
  }
}

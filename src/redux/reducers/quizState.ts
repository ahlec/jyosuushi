import {
  ActionChangeStudyPacks,
  ActionCreateQuestion,
  ActionMarkCorrectAnswer,
  ActionMarkIncorrectAnswer
} from "../actions";
import { QuizState } from "../index";

type ReducerAction =
  | ActionChangeStudyPacks
  | ActionCreateQuestion
  | ActionMarkCorrectAnswer
  | ActionMarkIncorrectAnswer;

export default function quizStateReducer(
  state: QuizState | undefined = "not-in-quiz",
  action: ReducerAction
): QuizState {
  switch (action.type) {
    case "change-study-packs":
      return "not-in-quiz";
    case "create-question":
      return "waiting-for-answer";
    case "mark-correct-answer":
    case "mark-incorrect-answer":
      return "reviewing-answer";
    default:
      return state;
  }
}

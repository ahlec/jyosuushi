import {
  ActionEndQuiz,
  ActionLeaveQuiz,
  ActionMarkCorrectAnswer,
  ActionMarkIncorrectAnswer,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { QuizState } from "../index";

type ReducerAction =
  | ActionEndQuiz
  | ActionMarkCorrectAnswer
  | ActionMarkIncorrectAnswer
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionLeaveQuiz;

export default function quizStateReducer(
  state: QuizState | undefined = "not-in-quiz",
  action: ReducerAction
): QuizState {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
      return "waiting-for-answer";
    case "mark-correct-answer":
    case "mark-incorrect-answer":
      return "reviewing-answer";
    case "end-quiz":
      return "quiz-wrapup";
    case "leave-quiz":
      return "not-in-quiz";
    default:
      return state;
  }
}

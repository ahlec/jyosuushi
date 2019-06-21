import {
  ActionEndQuiz,
  ActionLeaveQuiz,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionSkipQuestion,
  ActionStartQuiz,
  ActionSubmitCorrectAnswer,
  ActionSubmitIncorrectAnswer
} from "../actions";
import { QuizState } from "../index";

type ReducerAction =
  | ActionEndQuiz
  | ActionSubmitCorrectAnswer
  | ActionSubmitIncorrectAnswer
  | ActionNextQuestion
  | ActionSkipQuestion
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
    case "next-question":
      return "waiting-for-answer";
    case "skip-question":
    case "submit-correct-answer":
    case "submit-incorrect-answer":
      return "reviewing-answer";
    case "end-quiz":
      return "quiz-wrapup";
    case "leave-quiz":
      return "not-in-quiz";
    default:
      return state;
  }
}

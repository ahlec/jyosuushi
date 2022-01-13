import { QuizState } from "@jyosuushi/redux";
import {
  ActionEndQuiz,
  ActionLeaveQuiz,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionSkipQuestion,
  ActionStartQuiz,
  ActionSubmitCorrectAnswer,
  ActionSubmitIncorrectAnswer,
} from "@jyosuushi/redux/actions";

type ReducerAction =
  | ActionEndQuiz
  | ActionSubmitCorrectAnswer
  | ActionSubmitIncorrectAnswer
  | ActionNextQuestion
  | ActionSkipQuestion
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionLeaveQuiz;

const DEFAULT_STATE: QuizState = {
  mode: "regular",
  state: "not-in-quiz",
};

export default function quizStateReducer(
  state: QuizState = DEFAULT_STATE,
  action: ReducerAction
): QuizState {
  switch (action.type) {
    case "start-quiz":
      return {
        mode: action.mode,
        state: "waiting-for-answer",
      };
    case "restart-quiz":
    case "next-question":
      return {
        ...state,
        state: "waiting-for-answer",
      };
    case "skip-question":
    case "submit-correct-answer":
    case "submit-incorrect-answer":
      return {
        ...state,
        state: "reviewing-answer",
      };
    case "end-quiz":
      return {
        ...state,
        state: "quiz-wrapup",
      };
    case "leave-quiz":
      return {
        ...state,
        state: "not-in-quiz",
      };
    default:
      return state;
  }
}

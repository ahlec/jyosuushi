import { QuizState } from "@jyosuushi/redux";
import {
  ActionEndQuiz,
  ActionLeaveQuiz,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionSetEnabledPacks,
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
  | ActionSetEnabledPacks
  | ActionSkipQuestion
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionLeaveQuiz;

const DEFAULT_STATE: QuizState = {
  isInfinite: false,
  state: "not-in-quiz",
};

export default function quizStateReducer(
  state: QuizState = DEFAULT_STATE,
  action: ReducerAction
): QuizState {
  switch (action.type) {
    case "start-quiz":
      return {
        isInfinite: action.isInfinite,
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
    case "set-enabled-packs":
    case "leave-quiz":
      return {
        ...state,
        state: "not-in-quiz",
      };
    default:
      return state;
  }
}

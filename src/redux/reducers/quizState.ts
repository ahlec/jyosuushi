import { QuizState } from "@jyosuushi/redux";
import { ReduxAction } from "@jyosuushi/redux/actions";

const DEFAULT_STATE: QuizState = {
  mode: "regular",
  state: "not-in-quiz",
};

export default function quizStateReducer(
  state: QuizState = DEFAULT_STATE,
  action: ReduxAction
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

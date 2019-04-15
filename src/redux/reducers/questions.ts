import { ActionRestartQuiz, ActionStartQuiz } from "../actions";
import { Question } from "../index";

type ReducerAction = ActionStartQuiz | ActionRestartQuiz;

export default function questionsReducer(
  state: ReadonlyArray<Question> | undefined = [],
  action: ReducerAction
): ReadonlyArray<Question> {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
      return action.questions;
    default:
      return state;
  }
}

import {
  ActionCreateQuestion,
  ActionEndQuiz,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { Question } from "../index";

type ReducerAction =
  | ActionCreateQuestion
  | ActionEndQuiz
  | ActionStartQuiz
  | ActionRestartQuiz;

export default function currentQuestionReducer(
  state: Question | null | undefined = null,
  action: ReducerAction
): Question | null {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
    case "end-quiz":
      return null;
    case "create-question": {
      return {
        amount: action.amount,
        itemId: action.item.itemId,
        validAnswers: action.validAnswers
      };
    }
    default:
      return state;
  }
}

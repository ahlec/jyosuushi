import {
  ActionChangeStudyPacks,
  ActionCreateQuestion,
  ActionEndQuiz
} from "../actions";
import { Question } from "../index";

type ReducerAction =
  | ActionChangeStudyPacks
  | ActionCreateQuestion
  | ActionEndQuiz;

export default function currentQuestionReducer(
  state: Question | null | undefined = null,
  action: ReducerAction
): Question | null {
  switch (action.type) {
    case "change-study-packs":
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

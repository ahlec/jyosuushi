import { ActionChangeStudyPacks, ActionCreateQuestion } from "../actions";
import { Question } from "../index";

type ReducerAction = ActionChangeStudyPacks | ActionCreateQuestion;

export default function currentQuestionReducer(
  state: Question | null | undefined = null,
  action: ReducerAction
): Question | null {
  switch (action.type) {
    case "change-study-packs":
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

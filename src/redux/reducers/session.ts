import { ActionNextQuestion } from "../actions";
import { Session } from "../index";

type ReducerAction = ActionNextQuestion;

const DEFAULT_STATE: Session = {
  numQuestionsAsked: 0
};

export default function sessionReducer(
  state: Session | undefined = DEFAULT_STATE,
  action: ReducerAction
): Session {
  switch (action.type) {
    case "next-question":
      return {
        ...state,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    default:
      return state;
  }
}

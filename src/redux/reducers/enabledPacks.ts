import { ActionStartQuiz } from "../actions";

type ReducerAction = ActionStartQuiz;

export default function countersReducer(
  state: ReadonlyArray<string> | undefined = [],
  action: ReducerAction
): ReadonlyArray<string> {
  switch (action.type) {
    case "start-quiz":
      return action.enabledPacks.map(({ packId }) => packId);
    default:
      return state;
  }
}

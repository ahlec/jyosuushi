import { ActionChangeStudyPacks } from "../actions";

type ReducerAction = ActionChangeStudyPacks;

export default function countersReducer(
  state: ReadonlyArray<string> | undefined = [],
  action: ReducerAction
): ReadonlyArray<string> {
  switch (action.type) {
    case "change-study-packs":
      return action.enabledPacks.map(({ packId }) => packId);
    default:
      return state;
  }
}

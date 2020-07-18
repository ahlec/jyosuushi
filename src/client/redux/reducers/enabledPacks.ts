import { ActionSetEnabledPacks } from "@jyosuushi/redux/actions";

type ReducerAction = ActionSetEnabledPacks;

export default function countersReducer(
  state: ReadonlyArray<string> | undefined = [],
  action: ReducerAction
): ReadonlyArray<string> {
  switch (action.type) {
    case "set-enabled-packs":
      return action.enabledPacks.map(({ packId }) => packId);
    default:
      return state;
  }
}

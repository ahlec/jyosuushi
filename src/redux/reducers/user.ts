import { User } from "@jyosuushi/redux";
import { ReduxAction } from "@jyosuushi/redux/actions";

const DEFAULT_STATE: User = {
  lastAccessedVersion: JYOSUUSHI_CURRENT_SEMVER,
  numQuestionsAsked: 0,
};

export default function userReducer(
  state: User = DEFAULT_STATE,
  action: ReduxAction
): User {
  switch (action.type) {
    case "mark-latest-version":
      return {
        ...state,
        lastAccessedVersion: JYOSUUSHI_CURRENT_SEMVER,
      };
    case "next-question":
      return {
        ...state,
        numQuestionsAsked: state.numQuestionsAsked + 1,
      };
    default:
      return state;
  }
}

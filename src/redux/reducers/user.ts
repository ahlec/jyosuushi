import { User } from "@jyosuushi/redux";
import {
  ActionMarkLatestVersion,
  ActionNextQuestion
} from "@jyosuushi/redux/actions";

type ReducerAction = ActionMarkLatestVersion | ActionNextQuestion;

const DEFAULT_STATE: User = {
  lastAccessedVersion: JYOSUUSHI_CURRENT_SEMVER,
  numQuestionsAsked: 0
};

export default function userReducer(
  state: User = DEFAULT_STATE,
  action: ReducerAction
): User {
  switch (action.type) {
    case "mark-latest-version":
      return {
        ...state,
        lastAccessedVersion: JYOSUUSHI_CURRENT_SEMVER
      };
    case "next-question":
      return {
        ...state,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    default:
      return state;
  }
}

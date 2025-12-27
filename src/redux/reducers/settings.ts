import { AmountRange, Settings } from "@jyosuushi/redux";
import { ReduxAction } from "@jyosuushi/redux/actions";

const DEFAULT_SETTINGS: Settings = {
  amountRange: AmountRange.Medium,
  infiniteMode: false,
};

export default function settingsReducer(
  state: Settings | undefined = DEFAULT_SETTINGS,
  action: ReduxAction
): Settings {
  switch (action.type) {
    case "set-amount-range": {
      return {
        ...state,
        amountRange: action.amountRange,
      };
    }
    case "set-infinite-mode": {
      return {
        ...state,
        infiniteMode: action.infiniteMode,
      };
    }
    default:
      return state;
  }
}

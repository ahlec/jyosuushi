import { AmountRange, Settings } from "@jyosuushi/redux";
import {
  ActionSetAmountRange,
  ActionSetInfiniteMode,
  ActionSetLocalizationLanguage
} from "@jyosuushi/redux/actions";

type ReducerAction =
  | ActionSetAmountRange
  | ActionSetInfiniteMode
  | ActionSetLocalizationLanguage;

const DEFAULT_SETTINGS: Settings = {
  amountRange: AmountRange.Medium,
  infiniteMode: false,
  localization: "english"
};

export default function settingsReducer(
  state: Settings | undefined = DEFAULT_SETTINGS,
  action: ReducerAction
): Settings {
  switch (action.type) {
    case "set-amount-range": {
      return {
        ...state,
        amountRange: action.amountRange
      };
    }
    case "set-infinite-mode": {
      return {
        ...state,
        infiniteMode: action.infiniteMode
      };
    }
    case "set-localization": {
      return {
        ...state,
        localization: action.language
      };
    }
    default:
      return state;
  }
}

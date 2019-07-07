import {
  ActionSetAmountRange,
  ActionSetLocalizationLanguage
} from "../actions";
import { AmountRange, Settings } from "../index";

type ReducerAction = ActionSetAmountRange | ActionSetLocalizationLanguage;

const DEFAULT_SETTINGS: Settings = {
  amountRange: AmountRange.Medium,
  localization: "english"
};

export default function settingsReducer(
  state: Settings | undefined = DEFAULT_SETTINGS,
  action: ReducerAction
): Settings {
  switch (action.type) {
    case "set-localization": {
      return {
        ...state,
        localization: action.language
      };
    }
    case "set-amount-range": {
      return {
        ...state,
        amountRange: action.amountRange
      };
    }
    default:
      return state;
  }
}

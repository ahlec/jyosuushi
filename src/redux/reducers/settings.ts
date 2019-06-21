import { ActionSetLocalizationLanguage } from "../actions";
import { Settings } from "../index";

type ReducerAction = ActionSetLocalizationLanguage;

const DEFAULT_SETTINGS: Settings = {
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
    default:
      return state;
  }
}

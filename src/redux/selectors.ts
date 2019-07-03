import { State } from "./index";

import Localization from "../localization";
import ENGLISH from "../localization/english";

export function getLocalization(state: State): Localization {
  switch (state.settings.localization) {
    case "english":
      return ENGLISH;
  }
}

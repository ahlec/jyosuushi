import { State } from "./index";

import Localization from "@jyosuushi/localization";
import ENGLISH from "@jyosuushi/localization/english";

export function getLocalization(state: State): Localization {
  switch (state.settings.localization) {
    case "english":
      return ENGLISH;
  }
}

export function getIsQuizActive(state: State): boolean {
  return state.quizState.state !== "not-in-quiz";
}

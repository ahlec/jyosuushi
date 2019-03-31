import { StudyPack } from "../data/study-packs";
import { Answer, Item, LocalizationLanguage } from "./index";

export interface ActionSetLocalizationLanguage {
  type: "set-localization";
  language: LocalizationLanguage;
}

export interface ActionDefineSet {
  type: "define-set";
  items: ReadonlyArray<Item>;
}

export interface ActionCreateQuestion {
  type: "create-question";
  item: Item;
  amount: number;
  validAnswers: ReadonlyArray<Answer>;
}

export interface ActionEnableStudyPack {
  type: "enable-study-pack";
  studyPack: StudyPack;
}

export function enableStudyPack(studyPack: StudyPack): ActionEnableStudyPack {
  return {
    type: "enable-study-pack",
    studyPack
  };
}

export interface ActionDisableStudyPack {
  type: "disable-study-pack";
  studyPack: StudyPack;
}

export function disableStudyPack(studyPack: StudyPack): ActionDisableStudyPack {
  return {
    type: "disable-study-pack",
    studyPack
  };
}

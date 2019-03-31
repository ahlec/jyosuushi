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

export interface ActionChangeStudyPacks {
  type: "change-study-packs";
  enabledPacks: ReadonlyArray<StudyPack>;
}

export function changeStudyPacks(
  enabledPacks: ReadonlyArray<StudyPack>
): ActionChangeStudyPacks {
  return { enabledPacks, type: "change-study-packs" };
}

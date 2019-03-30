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

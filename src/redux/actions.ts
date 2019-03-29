import { Item, LocalizationLanguage } from "./index";

export interface ActionSetLocalizationLanguage {
  type: "set-localization";
  language: LocalizationLanguage;
}

export interface ActionDefineSet {
  type: "define-set";
  items: ReadonlyArray<Item>;
}

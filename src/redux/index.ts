export type LocalizationLanguage = "english";

export interface Settings {
  localization: LocalizationLanguage;
}

export interface State {
  settings: Settings;
}

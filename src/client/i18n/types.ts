import { Counter, StudyPack, Item } from "@jyosuushi/interfaces";

export type TranslationsFile = "en.json";

export interface Locale {
  dataLocalizers: {
    getCounterName: (counter: Counter) => string;
    getItemName: (item: Item, amount: number) => string;
    getStudyPackName: (studyPack: StudyPack) => string;
  };

  /**
   * The ISO/IEC 15897 locale code representing this locale.
   * This is used to interact with `react-intl`.
   */
  isoCode: string;

  /**
   * Which translation file should be loaded and used for this
   * locale within `react-intl`.
   */
  translationsFile: TranslationsFile;
}

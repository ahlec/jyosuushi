import { Counter, StudyPack, Item } from "@jyosuushi/interfaces";

export type Language = "english";

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
}

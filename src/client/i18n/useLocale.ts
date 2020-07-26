import { Locale } from "./types";

const DEFAULT_LOCALE: Locale = {
  dataLocalizers: {
    getCounterName: (counter): string => counter.englishName,
    getItemName: (item, amount): string =>
      amount === 1 ? item.englishSingular : item.englishPlural,
    getStudyPackName: (studyPack): string => studyPack.englishName,
  },
  isoCode: "en-US",
};

function useLocale(): Locale {
  return DEFAULT_LOCALE;
}

export default useLocale;

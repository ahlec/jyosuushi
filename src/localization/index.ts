import { StudyPack } from "../data/study-packs";
import { Counter, Item } from "../redux";

export const VARIABLE_ALEC_DEITLOFF = 17;
export const VARIABLE_ICON_CREDIT_LINK = 18;

export type CreditsPiece =
  | string
  | typeof VARIABLE_ALEC_DEITLOFF
  | typeof VARIABLE_ICON_CREDIT_LINK;

export default interface Localization {
  alecDeitloff: string;
  counterName: (counter: Counter) => string;
  countersDisplayHeader: (numCounters: number) => string;
  credits: ReadonlyArray<CreditsPiece>;
  itemPlural: (item: Item) => string;
  itemSingular: (item: Item) => string;
  resultColumnHeaderCounter: string;
  resultColumnHeaderRule: string;
  resultColumnHeaderStudyPack: string;
  resultColumnHeaderKanji: string;
  resultColumnHeaderHiragana: string;
  resultCorrectHeader: string;
  resultIncorrectHeader: string;
  resultSkippedHeader: string;
  resultTableIntro: string;
  resultsTableIrregularLabel: string;
  siteTagline: string;
  skippedQuestionResult: string;
  startQuiz: string;
  studyPackName: (studyPack: StudyPack) => string;
  studyPackSelectionHeader: string;
  studyPackSelectionSubheader: string;
  studyPackSize(size: number): string;
}

import { KangoConjugationOptions } from "./japanese/interfaces";

export interface ExternalLink {
  url: string;
  displayText: string;
  additionalDescription: string | null;
  siteName: string;
}

export interface CounterDisambiguation {
  counter1Id: string;
  counter2Id: string;
  disambiguation: string;
}

export enum WordOrigin {
  Japanese = "japanese",
  Chinese = "chinese",
  Foreign = "foreign"
}

export interface CounterReading {
  counterId: string;
  irregulars: { [amount: number]: ReadonlyArray<string> };
  kana: string;
  kangoConjugationOptions: KangoConjugationOptions;
  kanji: string | null;
  readingId: string;

  /**
   * The number (inclusive) through which this counter will
   * use wago counting as opposed to kango counting. The
   * range for counting always begins with 1, and it can be
   * expected that this number will always be less than or
   * equal to 10 (at most). Usages of wago beyond 10, if
   * even possible, will be marked as an irregular reading.
   *
   * If this counter doesn't use wago counting at all, this
   * will be null.
   */
  usesWagoForCountingThrough: number | null;
  wordOrigin: WordOrigin;
}

export interface Counter {
  counterId: string;
  englishName: string;
  readings: ReadonlyArray<CounterReading>;
  notes: string | null;
  externalLinks: ReadonlyArray<ExternalLink>;
  disambiguations: { [counterId: string]: CounterDisambiguation | undefined };
}

export enum CounterItemRelevance {
  Unknown,
  RarelyUsed,
  Situational,
  Common,
  Best
}

export interface ItemCounter {
  counterId: string;
  relevance: CounterItemRelevance;
}

export interface Item {
  itemId: string;
  counters: ReadonlyArray<ItemCounter>;
  englishSingular: string;
  englishPlural: string;
  minQuantity: number;
  maxQuantity: number;
}

export interface StudyPack {
  packId: string;
  englishName: string;
  counters: ReadonlyArray<Counter>;
}

export interface PendingQuestion {
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
}

export enum ConjugationCategory {
  Regular,
  Strange,
  Irregular
}

export interface Answer {
  counterId: string;
  category: ConjugationCategory;
  kana: string;
  kanji: string | null;
}

export interface Question {
  amount: number;
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
  validAnswers: ReadonlyArray<Answer>;
}

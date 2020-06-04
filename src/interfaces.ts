import { ComponentType } from "react";
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

export interface CounterWagoStyle {
  /**
   * If true, in addition to a wago conjugation with
   * ひと, a kango conjugation with イチ is also valid
   * and should be considered.
   */
  alsoUsesKangoIchi: boolean;

  /**
   * If true, in addition to a wago conjugation with
   * ふた, a kango conjugation with 二 is also valid
   * and should be considered.
   */
  alsoUsesKangoNi: boolean;

  /**
   * If true, in addition to a wago conjugation with
   * み, a kango conjugation with サン is also valid
   * and should be considered.
   */
  alsoUsesKangoSan: boolean;

  /**
   * The kana that should be used as the base for wago
   * conjugation.
   */
  kana: string;

  /**
   * The final number which is valid for standard wago
   * counting (inclusive). For counters that use wago,
   * they will always be in a range that starts with 1
   * and affects every number between 1 and the end
   * (inclusive). The standard ranges are always 10 or
   * less. There are some outliers (such as はつか) but
   * these are considered irregular rather than part
   * of standard wago counting.
   */
  rangeEndInclusive: number;
}

export interface CounterReading {
  counterId: string;
  kana: string;
  kangoConjugationOptions: KangoConjugationOptions;
  readingId: string;

  /**
   * The wago style used by this counter reading. If this
   * counter doesn't use wago counting at all, this will
   * be null.
   */
  wagoStyle: CounterWagoStyle | null;
  wordOrigin: WordOrigin;
}

export interface CounterKanjiInfo {
  primaryKanji: string;
  additionalKanji: ReadonlyArray<string>;
}

export enum CounterIrregularType {
  ArbitraryReading = "arbitrary-reading",
  SoundChange = "sound-change"
}

export interface CounterIrregular {
  amount: number;

  countingSystem: CountingSystem | null;

  /**
   * If true, then for the amount specified all
   * regular conjugations should be ignored and only
   * this (and other irregular readings for this amount)
   * should be considered. If all irregulars for this
   * amount are false, then the irregulars should
   * appear alongside the regular readings.
   */
  doesPresenceEraseRegularConjugations: boolean;

  type: CounterIrregularType;

  reading: string;
}

export type CounterNotesComponentProps = {};

export interface Counter {
  counterId: string;
  englishName: string;
  irregulars: { [amount: number]: ReadonlyArray<CounterIrregular> };
  kanji: CounterKanjiInfo | null;
  readings: ReadonlyArray<CounterReading>;
  notes: ComponentType<CounterNotesComponentProps> | null;
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

export enum CountingSystem {
  Kango = "kango",
  Wago = "wago",
  Eigo = "Eigo"
}

export interface Conjugation {
  amount: number;
  counterId: string;
  countingSystem: CountingSystem | null;
  irregularType: CounterIrregularType | null;
  kanji: ReadonlyArray<string> | null;
  reading: string;
}

export interface Answer {
  counterId: string;
  countingSystem: CountingSystem | null;
  irregularType: CounterIrregularType | null;
  kana: string;
  kanji: ReadonlyArray<string> | null;
}

export interface Question {
  amount: number;
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
  validAnswers: ReadonlyArray<Answer>;
}

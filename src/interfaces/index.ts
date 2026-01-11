import { ComponentType } from "react";
import { KangoConjugationOptions } from "@jyosuushi/japanese/interfaces";

export enum ExternalLinkLanguage {
  Japanese = "japanese",
  English = "english",
}

export interface ExternalLink {
  url: string;
  displayText: string;
  description: MarkdownComponent;
  siteName: string;
  language: ExternalLinkLanguage;
}

export enum WordOrigin {
  Japanese = "japanese",
  Chinese = "chinese",
  Foreign = "foreign",
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
  SoundChange = "sound-change",
}

export enum CounterReadingFrequency {
  Common = "common",
  Uncommon = "uncommon",
  Archaic = "archaic",
}

export interface CounterAnnotationIrregular {
  kind: "irregular";

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

/**
 * Annotation for the frequency of a specific reading.
 * @note All readings are implicitly assumed to be
 * common if they don't have a frequency annotation.
 */
export interface CounterAnnotationFrequency {
  kind: "frequency";
  reading: string;
  frequency: CounterReadingFrequency;
}

export type CounterAnnotation =
  | CounterAnnotationIrregular
  | CounterAnnotationFrequency;

export type MarkdownComponent = ComponentType<Record<string, never>>;

export interface CounterDisambiguation {
  distinction: MarkdownComponent;
  otherCounterId: string;
}

export interface Counter {
  counterId: string;
  englishName: string;
  footnotes: ReadonlyArray<MarkdownComponent>;
  /**
   * Annotations for specific numbers/amounts when using this counter
   * (if there are any). This could be notes about the frequency of a
   * reading, the presence of an irregular reading, etc.
   *
   */
  annotations: {
    [amount: number]: ReadonlyArray<CounterAnnotation> | undefined;
  };
  kanji: CounterKanjiInfo | null;
  readings: ReadonlyArray<CounterReading>;
  leadIn: string | null;
  notes: MarkdownComponent | null;
  externalLinks: ReadonlyArray<ExternalLink>;
  disambiguations: ReadonlyArray<CounterDisambiguation>;
}

export enum CounterItemRelevance {
  Unknown,
  RarelyUsed,
  Situational,
  Common,
  Best,
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

export interface PendingQuestion {
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
}

export enum CountingSystem {
  Kango = "kango",
  Wago = "wago",
  Eigo = "Eigo",
}

export interface Conjugation {
  amount: number;
  counterId: string;
  countingSystem: CountingSystem | null;
  frequency: CounterReadingFrequency;
  irregularType: CounterIrregularType | null;
  kanji: ReadonlyArray<string> | null;
  reading: string;
}

export interface CounterCollectionDescriptor {
  id: string;
  name: string;
}

export interface Answer {
  counterId: string;
  collections: readonly CounterCollectionDescriptor[];
  countingSystem: CountingSystem | null;
  frequency: CounterReadingFrequency;
  irregularType: CounterIrregularType | null;
  kana: string;
  kanji: ReadonlyArray<string> | null;
}

export interface Question {
  amount: number;
  itemId: string;
  possibleAmounts: ReadonlyArray<number>;
  allReadings: ReadonlyArray<Answer>;
}

export interface CounterCollection {
  id: string;
  name: string;
  counterIds: readonly string[];
  dateLastUpdated: number;
}

export interface StandardCounterCollection extends CounterCollection {
  description: string;
}

export interface UserCounterCollection extends CounterCollection {
  dateCreated: number;

  /**
   * Changes the name for this collection, resolving after the change has
   * taken place.
   */
  rename: (name: string) => Promise<void>;

  /**
   * Deletes this collection, resolving after the change has taken place.
   */
  delete: () => Promise<void>;

  /**
   * Adds a counter to this collection, resolving after the change has
   * taken place.
   */
  addCounter: (counterId: string) => Promise<void>;

  /**
   * Removes a counter from this collection, resolving after the change has
   * taken place.
   */
  removeCounter: (counterId: string) => Promise<void>;
}

/**
 * Creates a new, empty user collection, resolving after the change has
 * taken place. Resolves with the {@link UserCounterCollection.id} of the
 * collection that was just created.
 */
export type CreateUserCounterCollectionFn = (name: string) => Promise<string>;

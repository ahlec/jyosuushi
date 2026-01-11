export type DbBoolean = 0 | 1;

export enum DbIrregularType {
  ArbitraryReading = "arbitrary-reading",
  StandardWagoRangeSoundChange = "standard-wago-range-sound-change",
}

export enum DbWordOrigin {
  Japanese = "和語",
  Chinese = "漢語",
  Foreign = "外来語",
}

export enum DbExternalLinkLanguage {
  Japanese = "japanese",
  English = "english",
}

export enum DbCounterReadingFrequencyEnum {
  Uncommon = "uncommon",
  Archaic = "archaic",
}

export interface DbCounterAdditionalReading {
  counter_id: string;
  kana: string;
  uncommon: DbBoolean;
}

export interface DbCounterDisambiguation {
  counter1_id: string;
  counter2_id: string;
  distinction: string;
}

export interface DbCounterExternalLink {
  counter_id: string;
  url: string;
  site_name: string;
  link_text: string;
  description: string;
  language: DbExternalLinkLanguage;
}

export interface DbCounterIrregular {
  counter_id: string;
  number: number;
  kana: string;
  irregular_type: DbIrregularType;
  does_presence_erase_regular_conjugations: boolean;
}

export interface DbCounterReadingFrequency {
  counter_id: string;
  amount: number;
  kana: string;
  frequency: DbCounterReadingFrequencyEnum;
}

export interface DbCounterReading {
  counter_id: string;
  reading_id: string;
  word_origin: DbWordOrigin;
  kana: string;
  wago_style: string | null;
  wago_custom_base: string | null;
  kango_uses_yon: DbBoolean;
  kango_uses_yo: DbBoolean;
  kango_uses_shi: DbBoolean;
  kango_uses_nana: DbBoolean;
  kango_uses_shichi: DbBoolean;
  kango_uses_kyuu: DbBoolean;
  kango_uses_ku: DbBoolean;
}

export interface DbCounterAlternativeKanji {
  counter_id: string;
  kanji: string;
}

export interface DbCounter {
  counter_id: string;
  english_name: string;
  lead_in: string | null;
  notes: string | null;
  primary_kanji: string | null;
}

export interface DbEnumWordOrigin {
  word_origin: string;
}

export interface DbEnumIrregularType {
  irregular_type: string;
}

export interface DbEnumExternalLinkLanguage {
  language: string;
}

export interface DbEnumCounterReadingFrequency {
  frequency: string;
}

export interface DbItemCounter {
  item_id: string;
  counter_id: string;
  relevance: "rare" | "situational" | "common" | "best" | "unknown" | null;
}

export interface DbItem {
  item_id: string;
  english_singular: string;
  english_plural: string;
  custom_min_amount: number | null;
  custom_max_amount: number | null;
  japanese_kana: string | null;
  japanese_kanji: string | null;
}

export interface DbStudyPackContent {
  pack_id: string;
  counter_id: string;
  date_added: string;
}

export interface DbStudyPack {
  pack_id: string;
  english_name: string;
  date_counter_last_removed: string | null;
  description: string;
}

export interface DbWagoStyle {
  wago_style_handle: string;
  range_end_inclusive: number;
  also_uses_kango_one: DbBoolean;
  also_uses_kango_two: DbBoolean;
  also_uses_kango_three: DbBoolean;
}

export enum Schemas {
  CounterAdditionalReadings = "counter_additional_readings",
  CounterAlternativeKanji = "counter_alternative_kanji",
  CounterDisambiguations = "counter_disambiguations",
  CounterExternalLinks = "counter_external_links",
  CounterIrregulars = "counter_irregulars",
  CounterReadingFrequency = "counter_reading_frequency",
  CounterReadings = "counter_readings",
  Counters = "counters",
  ItemCounters = "item_counters",
  Items = "items",
  StudyPackContents = "study_pack_contents",
  StudyPacks = "study_packs",
  WagoStyle = "wago_style",
}

export enum EnumSchemas {
  EnumCounterReadingFrequency = "enum_counter_reading_frequency",
  EnumExternalLinkLanguage = "enum_external_link_language",
  EnumIrregularType = "enum_irregular_type",
  EnumWordOrigin = "enum_word_origin",
}

export interface SchemaEntryTypes {
  [Schemas.CounterAdditionalReadings]: DbCounterAdditionalReading;
  [Schemas.CounterDisambiguations]: DbCounterDisambiguation;
  [Schemas.CounterExternalLinks]: DbCounterExternalLink;
  [Schemas.CounterIrregulars]: DbCounterIrregular;
  [Schemas.CounterAlternativeKanji]: DbCounterAlternativeKanji;
  [Schemas.CounterReadings]: DbCounterReading;
  [Schemas.CounterReadingFrequency]: DbCounterReadingFrequency;
  [Schemas.Counters]: DbCounter;
  [EnumSchemas.EnumCounterReadingFrequency]: DbEnumCounterReadingFrequency;
  [EnumSchemas.EnumExternalLinkLanguage]: DbEnumExternalLinkLanguage;
  [EnumSchemas.EnumIrregularType]: DbEnumIrregularType;
  [EnumSchemas.EnumWordOrigin]: DbEnumWordOrigin;
  [Schemas.ItemCounters]: DbItemCounter;
  [Schemas.Items]: DbItem;
  [Schemas.StudyPackContents]: DbStudyPackContent;
  [Schemas.StudyPacks]: DbStudyPack;
  [Schemas.WagoStyle]: DbWagoStyle;
}

export interface IdentifierField {
  name: string;
  value: string;
}

export const ENTRY_IDENTIFIERS_RETRIEVER: {
  [schema in Schemas]: (
    entry: SchemaEntryTypes[schema],
  ) => ReadonlyArray<IdentifierField>;
} = {
  [Schemas.CounterAdditionalReadings]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "kana", value: entry.kana },
  ],
  [Schemas.CounterAlternativeKanji]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "kanji", value: entry.kanji },
  ],
  [Schemas.CounterDisambiguations]: (entry) => [
    { name: "counter1_id", value: entry.counter1_id },
    { name: "counter2_id", value: entry.counter2_id },
  ],
  [Schemas.CounterExternalLinks]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "url", value: entry.url },
  ],
  [Schemas.CounterIrregulars]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "number", value: entry.number.toString() },
    { name: "kana", value: entry.kana },
  ],
  [Schemas.CounterReadingFrequency]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "kana", value: entry.kana },
  ],
  [Schemas.CounterReadings]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "reading_id", value: entry.reading_id },
  ],
  [Schemas.Counters]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
  ],
  [Schemas.ItemCounters]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "item_id", value: entry.item_id },
  ],
  [Schemas.Items]: (entry) => [{ name: "item_id", value: entry.item_id }],
  [Schemas.StudyPackContents]: (entry) => [
    { name: "counter_id", value: entry.counter_id },
    { name: "pack_id", value: entry.pack_id },
  ],
  [Schemas.StudyPacks]: (entry) => [{ name: "pack_id", value: entry.pack_id }],
  [Schemas.WagoStyle]: (entry) => [
    { name: "wago_style_handle", value: entry.wago_style_handle },
  ],
};

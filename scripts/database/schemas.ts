export type DbBoolean = 0 | 1;
export type DbWordOrigin = "和語" | "漢語" | "外来語";

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
  additional_description: string | null;
}

export interface DbCounterIrregular {
  counter_id: string;
  number: number;
  kana: string;
  nonstandard: DbBoolean;
}

export interface DbCounterReading {
  counter_id: string;
  reading_id: string;
  word_origin: DbWordOrigin;
  kana: string;
  wago_range_end_inclusive: number | null;
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
  notes: string | null;
  primary_kanji: string | null;
}

export interface DbEnumWagoRange {
  range_end_inclusive: number;
}

export interface DbEnumWordOrigin {
  word_origin: string;
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
}

export interface DbStudyPack {
  pack_id: string;
  english_name: string;
}

export enum Schemas {
  CounterAdditionalReadings = "counter_additional_readings",
  CounterAlternativeKanji = "counter_alternative_kanji",
  CounterDisambiguations = "counter_disambiguations",
  CounterExternalLinks = "counter_external_links",
  CounterIrregulars = "counter_irregulars",
  CounterReadings = "counter_readings",
  Counters = "counters",
  ItemCounters = "item_counters",
  Items = "items",
  StudyPackContents = "study_pack_contents",
  StudyPacks = "study_packs"
}

export enum EnumSchemas {
  EnumWagoRange = "enum_wago_range",
  EnumWordOrigin = "enum_word_origin"
}

export interface SchemaEntryTypes {
  [Schemas.CounterAdditionalReadings]: DbCounterAdditionalReading;
  [Schemas.CounterDisambiguations]: DbCounterDisambiguation;
  [Schemas.CounterExternalLinks]: DbCounterExternalLink;
  [Schemas.CounterIrregulars]: DbCounterIrregular;
  [Schemas.CounterAlternativeKanji]: DbCounterAlternativeKanji;
  [Schemas.CounterReadings]: DbCounterReading;
  [Schemas.Counters]: DbCounter;
  [EnumSchemas.EnumWagoRange]: DbEnumWagoRange;
  [EnumSchemas.EnumWordOrigin]: DbEnumWordOrigin;
  [Schemas.ItemCounters]: DbItemCounter;
  [Schemas.Items]: DbItem;
  [Schemas.StudyPackContents]: DbStudyPackContent;
  [Schemas.StudyPacks]: DbStudyPack;
}

export interface IdentifierField {
  name: string;
  value: string;
}

export const ENTRY_IDENTIFIERS_RETRIEVER: {
  [schema in Schemas]: (
    entry: SchemaEntryTypes[schema]
  ) => ReadonlyArray<IdentifierField>;
} = {
  [Schemas.CounterAdditionalReadings]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "kana", value: entry.kana }
  ],
  [Schemas.CounterAlternativeKanji]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "kanji", value: entry.kanji }
  ],
  [Schemas.CounterDisambiguations]: entry => [
    { name: "counter1_id", value: entry.counter1_id },
    { name: "counter2_id", value: entry.counter2_id }
  ],
  [Schemas.CounterExternalLinks]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "url", value: entry.url }
  ],
  [Schemas.CounterIrregulars]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "number", value: entry.number.toString() },
    { name: "kana", value: entry.kana }
  ],
  [Schemas.CounterReadings]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "reading_id", value: entry.reading_id }
  ],
  [Schemas.Counters]: entry => [
    { name: "counter_id", value: entry.counter_id }
  ],
  [Schemas.ItemCounters]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "item_id", value: entry.item_id }
  ],
  [Schemas.Items]: entry => [{ name: "item_id", value: entry.item_id }],
  [Schemas.StudyPackContents]: entry => [
    { name: "counter_id", value: entry.counter_id },
    { name: "pack_id", value: entry.pack_id }
  ],
  [Schemas.StudyPacks]: entry => [{ name: "pack_id", value: entry.pack_id }]
};

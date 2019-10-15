export type DbBoolean = 0 | 1;

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

export interface DbCounter {
  counter_id: string;
  english_name: string;
  kana: string;
  kanji: string | null;
  uses_yon: DbBoolean;
  uses_yo: DbBoolean;
  uses_shi: DbBoolean;
  uses_nana: DbBoolean;
  uses_shichi: DbBoolean;
  uses_kyuu: DbBoolean;
  uses_ku: DbBoolean;
  notes: string | null;
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
  CounterDisambiguations = "counter_disambiguations",
  CounterExternalLinks = "counter_external_links",
  CounterIrregulars = "counter_irregulars",
  Counters = "counters",
  ItemCounters = "item_counters",
  Items = "items",
  StudyPackContents = "study_pack_contents",
  StudyPacks = "study_packs"
}

export interface SchemaEntryTypes {
  [Schemas.CounterAdditionalReadings]: DbCounterAdditionalReading;
  [Schemas.CounterDisambiguations]: DbCounterDisambiguation;
  [Schemas.CounterExternalLinks]: DbCounterExternalLink;
  [Schemas.CounterIrregulars]: DbCounterIrregular;
  [Schemas.Counters]: DbCounter;
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

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

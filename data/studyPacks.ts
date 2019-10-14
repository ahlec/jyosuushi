// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import { StudyPack } from "../src/interfaces";
import * as COUNTERS from "./counters";

const STUDY_PACK_COMMON: StudyPack = {
  counters: [
    COUNTERS.COUNTER_ヶ国,
    COUNTERS.COUNTER_ヶ所,
    COUNTERS.COUNTER_件,
    COUNTERS.COUNTER_円,
    COUNTERS.COUNTER_切れ,
    COUNTERS.COUNTER_口,
    COUNTERS.COUNTER_名,
    COUNTERS.COUNTER_周,
    COUNTERS.COUNTER_席,
    COUNTERS.COUNTER_戦,
    COUNTERS.COUNTER_曲,
    COUNTERS.COUNTER_束,
    COUNTERS.COUNTER_校,
    COUNTERS.COUNTER_皿,
    COUNTERS.COUNTER_社,
    COUNTERS.COUNTER_組,
    COUNTERS.COUNTER_缶,
    COUNTERS.COUNTER_色,
    COUNTERS.COUNTER_語,
    COUNTERS.COUNTER_足,
    COUNTERS.COUNTER_軒,
    COUNTERS.COUNTER_週
  ],
  englishName: "Common",
  packId: "common"
};

const STUDY_PACK_ESSENTIAL: StudyPack = {
  counters: [
    COUNTERS.COUNTER_ヶ月,
    COUNTERS.COUNTER_人,
    COUNTERS.COUNTER_冊,
    COUNTERS.COUNTER_分,
    COUNTERS.COUNTER_匹,
    COUNTERS.COUNTER_台,
    COUNTERS.COUNTER_回,
    COUNTERS.COUNTER_年,
    COUNTERS.COUNTER_日,
    COUNTERS.COUNTER_時,
    COUNTERS.COUNTER_本,
    COUNTERS.COUNTER_枚,
    COUNTERS.COUNTER_歳,
    COUNTERS.COUNTER_羽,
    COUNTERS.COUNTER_階,
    COUNTERS.COUNTER_頭
  ],
  englishName: "Essential",
  packId: "essential"
};

const STUDY_PACK_N4: StudyPack = {
  counters: [COUNTERS.COUNTER_冊, COUNTERS.COUNTER_羽, COUNTERS.COUNTER_頭],
  englishName: "JLPT N4",
  packId: "n4"
};

const STUDY_PACK_N5: StudyPack = {
  counters: [
    COUNTERS.COUNTER_人,
    COUNTERS.COUNTER_分,
    COUNTERS.COUNTER_匹,
    COUNTERS.COUNTER_台,
    COUNTERS.COUNTER_年,
    COUNTERS.COUNTER_日,
    COUNTERS.COUNTER_時,
    COUNTERS.COUNTER_本,
    COUNTERS.COUNTER_枚
  ],
  englishName: "JLPT N5",
  packId: "n5"
};

export const STUDY_PACKS: ReadonlyArray<StudyPack> = [
  STUDY_PACK_COMMON,
  STUDY_PACK_ESSENTIAL,
  STUDY_PACK_N4,
  STUDY_PACK_N5
];

export const STUDY_PACK_LOOKUP: { [packId: string]: StudyPack } = {
  common: STUDY_PACK_COMMON,
  essential: STUDY_PACK_ESSENTIAL,
  n4: STUDY_PACK_N4,
  n5: STUDY_PACK_N5
};

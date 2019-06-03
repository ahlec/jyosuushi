// DO NOT HAND-MODIFY THIS FILE!!
// This file was built using `yarn build-data` from the SQLite database.
// Modifications will be lost if they are made manually and not through the database.

import { StudyPack } from "../src/redux";
import * as COUNTERS from "./counters";

const STUDY_PACK_N2: StudyPack = {
  counters: [
    COUNTERS.COUNTER_DAYS_OF_THE_MONTH
  ],
  englishName: "JLPT N2",
  packId: "n2"
};

const STUDY_PACK_N3: StudyPack = {
  counters: [
    COUNTERS.COUNTER_DAYS_OF_THE_MONTH
  ],
  englishName: "JLPT N3",
  packId: "n3"
};

const STUDY_PACK_N5: StudyPack = {
  counters: [
    COUNTERS.COUNTER_DAYS_OF_THE_MONTH,
    COUNTERS.COUNTER_MINUTE
  ],
  englishName: "JLPT N5",
  packId: "n5"
};

export const STUDY_PACKS: ReadonlyArray<StudyPack> = [
  STUDY_PACK_N2,
  STUDY_PACK_N3,
  STUDY_PACK_N5
];

export const STUDY_PACK_LOOKUP: {
  [packId: string]: StudyPack;
} = {
  n2: STUDY_PACK_N2,
  n3: STUDY_PACK_N3,
  n5: STUDY_PACK_N5
};

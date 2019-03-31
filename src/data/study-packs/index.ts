import { StudyPack } from "./@interface";

import STUDY_PACK_N2 from "./study-pack-n2";
import STUDY_PACK_N3 from "./study-pack-n3";
import STUDY_PACK_N4 from "./study-pack-n4";
import STUDY_PACK_N5 from "./study-pack-n5";

export { StudyPack };
export const STUDY_PACKS: ReadonlyArray<StudyPack> = [
  STUDY_PACK_N2,
  STUDY_PACK_N3,
  STUDY_PACK_N4,
  STUDY_PACK_N5
];

interface StudyPackLookup {
  [packId: string]: StudyPack;
}

export const STUDY_PACK_LOOKUP: StudyPackLookup = STUDY_PACKS.reduce(
  (lookup: StudyPackLookup, studyPack: StudyPack) => {
    lookup[studyPack.packId] = studyPack;
    return lookup;
  },
  {}
);

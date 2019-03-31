import { StudyPack } from "./@interface";

import STUDY_PACK_N4 from "./study-pack-n4";
import STUDY_PACK_N5 from "./study-pack-n5";

export { StudyPack };
export const STUDY_PACKS: ReadonlyArray<StudyPack> = [
  STUDY_PACK_N4,
  STUDY_PACK_N5
];

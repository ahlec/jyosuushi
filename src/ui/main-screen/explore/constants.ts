import { StudyPack } from "../../../interfaces";

export const EXPLORE_PAGE_PATH = "/explore";

const EXPLORE_STUDY_PACK_PATH_ROOT = `${EXPLORE_PAGE_PATH}/study-pack`;
export const EXPLORE_STUDY_PACK_PATH = `${EXPLORE_STUDY_PACK_PATH_ROOT}/:packId`;

export function getStudyPackLink(studyPack: StudyPack): string {
  return `${EXPLORE_STUDY_PACK_PATH_ROOT}/${studyPack.packId}`;
}

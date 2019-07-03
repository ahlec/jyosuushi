import { Counter, StudyPack } from "../../../interfaces";

export const EXPLORE_PAGE_PATH = "/explore";

const EXPLORE_STUDY_PACK_PATH_ROOT = `${EXPLORE_PAGE_PATH}/study-pack`;
export const EXPLORE_STUDY_PACK_PATH = `${EXPLORE_STUDY_PACK_PATH_ROOT}/:packId`;

const EXPLORE_COUNTER_PATH_ROOT = `${EXPLORE_PAGE_PATH}/counter`;
export const EXPLORE_COUNTER_PATH = `${EXPLORE_COUNTER_PATH_ROOT}/:counterId`;

export function getStudyPackLink(studyPack: StudyPack): string {
  return `${EXPLORE_STUDY_PACK_PATH_ROOT}/${studyPack.packId}`;
}

export function getCounterLink(counter: Counter): string {
  return `${EXPLORE_COUNTER_PATH_ROOT}/${counter.counterId}`;
}

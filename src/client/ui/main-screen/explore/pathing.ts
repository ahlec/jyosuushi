export const EXPLORE_PAGE_PATH = "/explore";

const EXPLORE_STUDY_PACK_PATH_ROOT = `${EXPLORE_PAGE_PATH}/study-pack`;
export const EXPLORE_STUDY_PACK_PATH = `${EXPLORE_STUDY_PACK_PATH_ROOT}/:packId`;

const EXPLORE_COUNTER_PATH_ROOT = `${EXPLORE_PAGE_PATH}/counter`;
export const EXPLORE_COUNTER_PATH = `${EXPLORE_COUNTER_PATH_ROOT}/:counterId`;

export function getCounterCollectionPath(id: string): string {
  return `${EXPLORE_STUDY_PACK_PATH_ROOT}/${id}`;
}

export function getCounterLink(id: string): string {
  return `${EXPLORE_COUNTER_PATH_ROOT}/${id}`;
}

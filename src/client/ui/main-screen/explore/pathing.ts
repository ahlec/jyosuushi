export const EXPLORE_PAGE_PATH = "/explore";

export function getCounterCollectionPath(id: string): string {
  return `${EXPLORE_PAGE_PATH}/collection/${id}`;
}

export function getCounterLink(id: string): string {
  return `${EXPLORE_PAGE_PATH}/counter/${id}`;
}

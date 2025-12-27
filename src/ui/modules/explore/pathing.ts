type GetPathOptions = {
  full?: boolean;
};

export const EXPLORE_PAGE_PATH = "/explore";

export function getCounterCollectionPath(
  id: string,
  { full = true }: GetPathOptions = {}
): string {
  return `${full ? EXPLORE_PAGE_PATH : ""}/collection/${id}`;
}

export function getCounterLink(
  id: string,
  { full = true }: GetPathOptions = {}
): string {
  return `${full ? EXPLORE_PAGE_PATH : ""}/counter/${id}`;
}

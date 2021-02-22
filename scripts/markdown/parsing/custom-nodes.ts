import { isIndexableObject } from "../utils";

export const INTRASITE_LINK_HAST_NODE_NAME = "intrasiteLink";

export interface IntrasiteLinkProperties {
  counterId: string;
  specificKanji: string | null;
  specificReading: string | null;
}

export function isIntrasiteLinkProperties(
  obj: unknown
): obj is IntrasiteLinkProperties {
  if (!isIndexableObject(obj)) {
    return false;
  }

  if (typeof obj.counterId !== "string") {
    return false;
  }

  if (obj.specificKanji !== null && typeof obj.specificKanji !== "string") {
    return false;
  }

  if (obj.specificReading !== null && typeof obj.specificReading !== "string") {
    return false;
  }

  return true;
}

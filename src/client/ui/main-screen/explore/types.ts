import { isIndexableObject } from "@shared/utils";

const EXPLORE_LOCATION_STATE_TYPE = "explore-location-state";
const EXPLORE_LOCATION_STATE_CURRENT_SCHEMA = "v2";

export interface ExploreLocationState {
  // Hardcoded values to identify and determine validity
  type: typeof EXPLORE_LOCATION_STATE_TYPE;
  schema: typeof EXPLORE_LOCATION_STATE_CURRENT_SCHEMA;

  // Variable fields
  fromCollection: {
    id: string;
    name: string;
  } | null;
}

export function isExploreLocationState(
  obj: unknown
): obj is ExploreLocationState {
  if (!isIndexableObject(obj)) {
    return false;
  }

  if (obj["type"] !== EXPLORE_LOCATION_STATE_TYPE) {
    return false;
  }

  if (obj["schema"] !== EXPLORE_LOCATION_STATE_CURRENT_SCHEMA) {
    return false;
  }

  return true;
}

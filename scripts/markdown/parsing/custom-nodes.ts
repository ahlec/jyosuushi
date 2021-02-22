import { isIndexableObject } from "../utils";

export const COUNTER_DISPLAY_HAST_NODE_NAME = "counterDisplay";
export const COUNTER_DISPLAY_PROPS_KEY = "counterDisplay";

export interface CounterDisplayProperties {
  primaryText: string;
  reading: string;
}

export function isCounterDisplayProperties(
  obj: unknown
): obj is CounterDisplayProperties {
  if (!isIndexableObject(obj)) {
    return false;
  }

  if (typeof obj.primaryText !== "string") {
    return false;
  }

  if (typeof obj.reading !== "string") {
    return false;
  }

  return true;
}

export const INTRASITE_LINK_HAST_NODE_NAME = "intrasiteLink";
export const INTRASITE_LINK_PROPS_KEY = "intrasiteLink";

export interface IntrasiteLinkProperties {
  id: string;
  type: "counter";
}

export function isIntrasiteLinkProperties(
  obj: unknown
): obj is IntrasiteLinkProperties {
  if (!isIndexableObject(obj)) {
    return false;
  }

  if (obj.type !== "counter") {
    return false;
  }

  return typeof obj.id === "string" && !!obj.id;
}

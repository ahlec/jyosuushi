import { JsxComponentUsage } from "../types";

const BASE_COMPONENT_USAGE: JsxComponentUsage = {
  counterDisplay: false,
  intrasiteLink: false,
};

export function mergeComponentUsages(
  usages: readonly JsxComponentUsage[]
): JsxComponentUsage {
  const combined: JsxComponentUsage = { ...BASE_COMPONENT_USAGE };
  usages.forEach((usage): void => {
    Object.entries(usage).forEach(
      ([key, value]: [keyof JsxComponentUsage, boolean]): void => {
        if (!value) {
          return;
        }

        combined[key] = true;
      }
    );
  });
  return combined;
}

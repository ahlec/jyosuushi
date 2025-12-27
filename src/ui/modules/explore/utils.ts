import { orderBy } from "lodash";

import { Locale } from "@jyosuushi/i18n/types";

import { Counter } from "@jyosuushi/interfaces";

export function orderCounters(
  counters: readonly Counter[],
  locale: Locale,
): readonly Counter[] {
  return orderBy(counters, (counter): string =>
    locale.dataLocalizers.getCounterName(counter),
  );
}

import { useMemo } from "react";

import { COUNTERS_LOOKUP } from "@data/counters";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import { Counter } from "@jyosuushi/interfaces";

function useDistinctCounters(
  collections: readonly CounterCollection[]
): readonly Counter[] {
  return useMemo((): readonly Counter[] => {
    const result: Counter[] = [];
    const encounteredIds = new Set<string>();

    collections.forEach((collection): void => {
      collection.counterIds.forEach((counterId): void => {
        if (encounteredIds.has(counterId)) {
          return;
        }

        result.push(COUNTERS_LOOKUP[counterId]);
        encounteredIds.add(counterId);
      });
    });

    return result;
  }, [collections]);
}

export default useDistinctCounters;

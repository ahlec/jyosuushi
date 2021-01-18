import { sortBy } from "lodash";
import { Writable } from "stream";

import ValidatedDataSource from "../database/ValidatedDataSource";

import { WriteFileResults } from "./types";
import { productionStringify } from "./utils";

function writeCounterIdsFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): WriteFileResults {
  const counterIds = sortBy(
    dataSource.counters.valid.map((counter): string => counter.counter_id)
  );

  stream.write(
    `\n\nexport const COUNTER_IDS: ReadonlySet<string> = new Set(${productionStringify(
      counterIds
    )});`
  );

  return {
    additionalFileRequests: [],
    output: [],
  };
}

export default writeCounterIdsFile;

import { Writable } from "stream";
import ValidatedDataSource from "../database/ValidatedDataSource";

import { CounterDisambiguation } from "../../src/interfaces";

import { getDisambiguationId } from "./utils";

export default function writeDisambiguationsFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): void {
  stream.write('import { CounterDisambiguation } from "../src/interfaces";');

  for (const dbDisambiguation of dataSource.counter_disambiguations.valid) {
    const variableName = getDisambiguationId(
      dbDisambiguation.counter1_id,
      dbDisambiguation.counter2_id
    );

    const disambiguation: CounterDisambiguation = {
      counter1Id: dbDisambiguation.counter1_id,
      counter2Id: dbDisambiguation.counter2_id,
      disambiguation: dbDisambiguation.distinction
    };

    stream.write(
      `\n\nexport const ${variableName}: CounterDisambiguation = ${JSON.stringify(
        disambiguation
      )};`
    );
  }

  stream.write("\n");
}

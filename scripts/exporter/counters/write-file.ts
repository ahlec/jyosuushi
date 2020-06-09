import { flatten, sortBy } from "lodash";
import { Writable } from "stream";

import { DbCounter, DbIrregularType } from "../../database/schemas";
import ValidatedDataSource from "../../database/ValidatedDataSource";

import { WriteFileResults } from "../types";
import { productionStringify, ProductionVariable } from "../utils";

import exportSingleCounter, {
  CounterExportResults,
  Import
} from "./single-counter-export";
import CounterDataLookup from "./CounterDataLookup";

export function convertToProductionIrregularType(
  dbType: DbIrregularType
): ProductionVariable {
  switch (dbType) {
    case DbIrregularType.ArbitraryReading: {
      return new ProductionVariable("CounterIrregularType.ArbitraryReading");
    }
    case DbIrregularType.StandardWagoRangeSoundChange: {
      return new ProductionVariable("CounterIrregularType.SoundChange");
    }
  }
}

function selectCounterId(counter: DbCounter): string {
  return counter.counter_id;
}

function selectImports({
  imports
}: CounterExportResults): ReadonlyArray<Import> {
  return imports;
}

function selectImportFilepath(importDefinition: Import): string {
  return importDefinition.importFilepath;
}

export default function writeCountersFile(
  stream: Writable,
  dataSource: ValidatedDataSource
): WriteFileResults {
  const dataLookup = new CounterDataLookup(dataSource);
  const counters = sortBy(dataSource.counters.valid, selectCounterId).map(
    (counter): CounterExportResults =>
      exportSingleCounter(counter, dataLookup.getJoinData(counter.counter_id))
  );

  // Write out imports
  stream.write(
    'import { Counter, CounterIrregularType, CountingSystem, ExternalLinkLanguage, WordOrigin } from "../src/interfaces";\n'
  );

  const orderedImports = sortBy(
    flatten(counters.map(selectImports)),
    selectImportFilepath
  );
  if (orderedImports.length) {
    stream.write("\n\n");

    for (const { completeImportStatement } of orderedImports) {
      stream.write(`${completeImportStatement}\n`);
    }
  }

  // Write out individual counter variables
  for (const { declaredValue, variableName } of counters) {
    stream.write(
      `\n\nexport const ${variableName}: Counter = ${declaredValue};`
    );
  }

  stream.write("\n\n");

  // Write out lookup
  const lookup = counters.reduce(
    (
      obj: { [counterId: string]: ProductionVariable },
      { counterId, variableName }
    ) => {
      obj[counterId] = new ProductionVariable(variableName);
      return obj;
    },
    {}
  );
  stream.write(
    `export const COUNTERS_LOOKUP: { [counterId: string]: Counter; } = ${productionStringify(
      lookup
    )};`
  );

  // Return
  return {
    additionalFileRequests: []
  };
}

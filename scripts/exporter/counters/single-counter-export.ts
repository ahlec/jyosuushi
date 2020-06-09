import { DbCounter } from "../../database/schemas";

import { getCounterId, productionStringify } from "../utils";

import { CounterJoinData } from "./CounterDataLookup";
import { convertToProtoCounter } from "./ProtoCounter";

export interface Import {
  completeImportStatement: string;
  importFilepath: string;
}

export interface CounterExportResults {
  counterId: string;
  declaredValue: string;
  imports: ReadonlyArray<Import>;
  variableName: string;
}

function exportSingleCounter(
  counter: DbCounter,
  joinData: CounterJoinData
): CounterExportResults {
  const variableName = getCounterId(counter.counter_id);
  const protoCounter = convertToProtoCounter(counter, joinData);
  return {
    counterId: counter.counter_id,
    declaredValue: productionStringify(protoCounter),
    imports: [],
    variableName
  };
}

export default exportSingleCounter;

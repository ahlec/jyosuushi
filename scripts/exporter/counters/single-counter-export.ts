import { DbCounter } from "../../database/schemas";

import writeCounterComponentsFile from "../counter-components/write-file";

import { FileExportRequest, WriteFileResults } from "../types";
import { getCounterId, productionStringify } from "../utils";

import { CounterJoinData } from "./CounterDataLookup";
import CounterMarkdownConsolidator from "./CounterMarkdownConsolidator";
import { convertToProtoCounter } from "./ProtoCounter";

export interface Import {
  completeImportStatement: string;
  importFilepath: string;
}

export interface CounterExportResults {
  counterId: string;
  declaredValue: string;
  fileExportRequests: ReadonlyArray<FileExportRequest>;
  imports: ReadonlyArray<Import>;
  variableName: string;
}

function exportSingleCounter(
  counter: DbCounter,
  joinData: CounterJoinData
): CounterExportResults {
  // ORDER MATTERS HERE!
  // Add things to the consolidator in the order they'll appear in
  // the DOM so as to ensure correct numbering of footnotes.
  const markdownConsolidator = new CounterMarkdownConsolidator(
    `${counter.counter_id}Components`
  );
  const notesComponent = counter.notes
    ? markdownConsolidator.addMarkdown("CounterNotes", counter.notes)
    : null;

  const variableName = getCounterId(counter.counter_id);
  const protoCounter = convertToProtoCounter(counter, joinData, {
    notesComponent
  });

  let fileExportRequests: ReadonlyArray<FileExportRequest>;
  let imports: ReadonlyArray<Import>;
  if (markdownConsolidator.hasComponents) {
    const baseRelativeFilepath = `counter-components/${counter.counter_id}`;
    fileExportRequests = [
      {
        relativeFilepath: `./${baseRelativeFilepath}.tsx`,
        writeFunction: (stream): WriteFileResults =>
          writeCounterComponentsFile(
            markdownConsolidator.markdownComponents,
            stream
          )
      }
    ];

    const importFilepath = `@data/${baseRelativeFilepath}`;
    imports = [
      {
        completeImportStatement: `import * as ${markdownConsolidator.importedNamespace} from '${importFilepath}';`,
        importFilepath
      }
    ];
  } else {
    fileExportRequests = [];
    imports = [];
  }

  return {
    counterId: counter.counter_id,
    declaredValue: productionStringify(protoCounter),
    fileExportRequests,
    imports,
    variableName
  };
}

export default exportSingleCounter;

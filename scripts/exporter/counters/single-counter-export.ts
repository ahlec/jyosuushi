import { DbCounter } from "../../database/schemas";
import { MarkdownStyle } from "../../markdown";

import writeCounterComponentsFile from "../counter-components/write-file";

import {
  ExportOutputEntry,
  FileExportRequest,
  WriteFileResults,
} from "../types";
import {
  getCounterId,
  productionStringify,
  ProductionVariable,
} from "../utils";

import { CounterJoinData } from "./CounterDataLookup";
import CounterMarkdownConsolidator from "./CounterMarkdownConsolidator";
import { convertToProtoCounter } from "./ProtoCounter";
import { PreparedCounterExternalLink } from "./types";
import { getOtherCounterId } from "./utils";

export interface Import {
  completeImportStatement: string;
  importFilepath: string;
}

export interface CounterExportResults {
  consoleOutput: ReadonlyArray<ExportOutputEntry>;
  counterId: string;
  declaredValue: string;
  fileExportRequests: ReadonlyArray<FileExportRequest>;
  imports: ReadonlyArray<Import>;
  variableName: string;
}

function exportSingleCounter(
  counter: DbCounter,
  joinData: CounterJoinData,
  allExportedCounterIds: ReadonlySet<string>
): CounterExportResults {
  // ORDER MATTERS HERE!
  // Add things to the consolidator in the order they'll appear in
  // the DOM so as to ensure correct numbering of footnotes.
  const markdownConsolidator = new CounterMarkdownConsolidator(
    `${counter.counter_id}Components`,
    allExportedCounterIds
  );
  const notesComponent = counter.notes
    ? markdownConsolidator.addMarkdown(
        "CounterNotes",
        counter.notes,
        MarkdownStyle.Block
      )
    : null;

  const externalLinks = joinData.externalLinks.map(
    (externalLink, index): PreparedCounterExternalLink => ({
      ...externalLink,
      description: markdownConsolidator.addMarkdown(
        `ExternalLink${index}`,
        externalLink.description,
        MarkdownStyle.Inline
      ),
    })
  );

  const disambiguationComponents: {
    [otherCounterId: string]: ProductionVariable;
  } = {};
  for (const disambiguation of joinData.disambiguations) {
    const otherCounterId = getOtherCounterId(
      counter.counter_id,
      disambiguation
    );
    disambiguationComponents[otherCounterId] = markdownConsolidator.addMarkdown(
      `Disambiguation${otherCounterId}`,
      disambiguation.distinction,
      MarkdownStyle.Block
    );
  }

  const variableName = getCounterId(counter.counter_id);
  const protoCounter = convertToProtoCounter(
    counter,
    joinData,
    {
      disambiguationComponents,
      notesComponent,
    },
    externalLinks,
    markdownConsolidator.footnoteComponentVariables
  );

  let fileExportRequests: ReadonlyArray<FileExportRequest>;
  let imports: ReadonlyArray<Import>;
  if (markdownConsolidator.hasComponents) {
    const baseRelativeFilepath = `counter-components/${counter.counter_id}`;
    fileExportRequests = [
      {
        directory: "client-data",
        relativeFilename: `${baseRelativeFilepath}.tsx`,
        writeFunction: (stream): WriteFileResults =>
          writeCounterComponentsFile(
            markdownConsolidator.markdownComponents,
            stream
          ),
      },
    ];

    const importFilepath = `@data/${baseRelativeFilepath}`;
    imports = [
      {
        completeImportStatement: `import * as ${markdownConsolidator.importedNamespace} from '${importFilepath}';`,
        importFilepath,
      },
    ];
  } else {
    fileExportRequests = [];
    imports = [];
  }

  return {
    consoleOutput: markdownConsolidator.consoleOutput,
    counterId: counter.counter_id,
    declaredValue: productionStringify(protoCounter),
    fileExportRequests,
    imports,
    variableName,
  };
}

export default exportSingleCounter;

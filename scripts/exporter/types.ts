import { Writable } from "stream";

import ValidatedDataSource from "../database/ValidatedDataSource";

export type ExportOutputEntry =
  | string
  | { type: "warning"; message: string }
  | { type: "error"; message: string }
  | {
      type: "group";
      header: string;
      contents: ReadonlyArray<ExportOutputEntry>;
    };

export interface WriteFileResults {
  additionalFileRequests: ReadonlyArray<FileExportRequest>;
  output: ReadonlyArray<ExportOutputEntry>;
}

export type WriteFunction = (
  stream: Writable,
  dataSource: ValidatedDataSource
) => WriteFileResults;

export interface FileExportRequest {
  relativeFilepath: string;
  writeFunction: WriteFunction;
}

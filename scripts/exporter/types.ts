import { Writable } from "stream";

import ValidatedDataSource from "../database/ValidatedDataSource";

export interface WriteFileResults {
  additionalFileRequests: ReadonlyArray<FileExportRequest>;
}

export type WriteFunction = (
  stream: Writable,
  dataSource: ValidatedDataSource
) => WriteFileResults;

export interface FileExportRequest {
  relativeFilepath: string;
  writeFunction: WriteFunction;
}

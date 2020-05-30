import { Parser } from "unified";
import { Add } from "remark-parse";

export interface Position {
  line: number;
  column: number;
  offset: number;
}

export interface RemarkParser extends Parser {
  enterBlock: () => () => void;
  tokenizeBlock: (str: string, position: Position) => any;
  tokenizeInline: (str: string, position: Position) => any;
}

export interface Eat {
  (value: string): Add;
  now: () => Position;
}

export interface JsxCompilerVFileData {
  doesRequireClassNamesLibrary: boolean;
}

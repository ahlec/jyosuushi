import { Parser } from "unified";
import { Add } from "remark-parse";

export interface Position {
  line: number;
  column: number;
  offset: number;
}

export interface RemarkParser extends Parser {
  tokenizeInline: (str: string, position: Position) => unknown;
}

export interface Eat {
  (value: string): Add;
  now: () => Position;
}

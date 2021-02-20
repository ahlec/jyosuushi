import { Parser } from "unified";
import { Node } from "unist";
import { Add } from "remark-parse";

export interface Position {
  line: number;
  column: number;
  offset: number;
}

export interface RemarkParser extends Parser {
  offset: { [num: number]: number };
  enterBlock: () => () => void;
  tokenizeBlock: (str: string, position: Position) => unknown;
  tokenizeInline: (str: string, position: Position) => unknown;
}

export interface Eat {
  (value: string): Add;
  now: () => Position;
}

export type TokenizerReturnType = Node | boolean | void;

export interface InlineTokenizer {
  (
    this: RemarkParser,
    eat: Eat,
    value: string,
    silent: boolean
  ): TokenizerReturnType;

  locator: (value: string, fromIndex: number) => number;
}

export type BlockTokenizer = (
  this: RemarkParser,
  eat: Eat,
  value: string,
  silent: boolean
) => TokenizerReturnType;

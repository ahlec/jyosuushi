import { Plugin } from "unified";

interface RemarkFootnotesParseOptions {
  /**
   * Whether to support `^[inline notes]`.
   *
   * Default: false.
   */
  inlineNotes: boolean;
}

interface Parse extends Plugin<[Partial<RemarkFootnotesParseOptions>?]> {
  (options: Partial<RemarkFootnotesParseOptions>): void;
}

declare const remarkFootnotesParse: Parse;

export = remarkFootnotesParse;

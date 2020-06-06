import { Plugin } from "unified";

interface RemarkRubyParseOptions {
  /**
   * Ruby fallback parenthesis which will be used in `rp` tag. It
   * should be a string with at most two characters. The first will
   * be used as left parenthesis, the last will be used as right
   * parenthesis.
   *
   * Default: "()".
   */
  parenthesis: string;
}

interface Parse extends Plugin<[Partial<RemarkRubyParseOptions>?]> {
  (options: Partial<RemarkRubyParseOptions>): void;
}

declare const remarkRubyParse: Parse;

export = remarkRubyParse;

import { extractFootnotes } from "./extract-footnotes";
import { compileToJsx } from "./jsx-compiler/compiler";
import { parseMarkdown } from "./parsing/parse";

export interface JsxComponent {
  jsx: string;
  requiresCounterLink: boolean;
}

export interface FootnoteJsxComponent extends JsxComponent {
  footnoteId: number;
}

export interface MarkdownToJsxResults {
  body: JsxComponent;
  footnotes: ReadonlyArray<FootnoteJsxComponent>;
  warnings: ReadonlyArray<string>;
}

interface ConvertMarkdownToJsxOptions {
  /**
   * A set with all of the counter IDs for all counters that
   * are currently exported from the database. These are used
   * to determine which counters are currently defined and
   * should be rendered as links when encountering
   * <counter:XXX>, and which counters are currently not exported
   * and shouldn't be exported.
   */
  allExportedCounterIds: ReadonlySet<string>;

  /**
   * A number, inclusive, that the footnotes should pick up on.
   * The first footnote encountered will be listed with this
   * number, and the subsequent footnote encountered will be
   * listed with this number + 1, and so on.
   */
  footnotesCountingStart: number;
}

export function convertMarkdownToJSX(
  markdown: string,
  options: ConvertMarkdownToJsxOptions
): MarkdownToJsxResults {
  // Parse the provided Markdown
  const { hastSyntaxTree, warnings } = parseMarkdown(
    markdown,
    options.allExportedCounterIds,
    options.footnotesCountingStart
  );

  // Extract the footnotes from the syntax tree to store them separately.
  const footnoteNodes = extractFootnotes(hastSyntaxTree);
  const footnotes = footnoteNodes.map(
    (node): FootnoteJsxComponent => ({
      footnoteId: node.refId,
      ...compileToJsx({
        children: [node.syntaxTree],
        type: "root",
      }),
    })
  );

  // Compile the body of the markdown to JSX
  const body = compileToJsx(hastSyntaxTree);

  // Return the final results
  return {
    body,
    footnotes,
    warnings,
  };
}

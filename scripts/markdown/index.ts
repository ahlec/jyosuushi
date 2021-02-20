import { extractFootnotes } from "./extract-footnotes";
import { compileToJsx } from "./jsx-compiler/compiler";
import { parseMarkdown } from "./parsing/parse";
import { ValidationResult } from "./types";
import { validateInlineSyntaxTree } from "./validate-inline";

export interface JsxComponent {
  jsx: string;
  requiresCounterLink: boolean;
}

export interface FootnoteJsxComponent extends JsxComponent {
  footnoteId: number;
}

export enum MarkdownStyle {
  /**
   * Markdown elements that should be allowed to span multiple paragraphs
   * and include things such as lists would be "block" style. This provides
   * the full array of Markdown features.
   */
  Block = "block",

  /**
   * Markdown that is meant to be displayed only as inline text
   * would be "inline" style. This disallows access to certain elements like
   * lists, and will cause an error if the Markdown spans more than a single
   * paragraph.
   */
  Inline = "inline",
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
   * A determination of what kind of Markdown is supported and how
   * the component should be written when compiled.
   */
  style: MarkdownStyle;

  /**
   * A number, inclusive, that the footnotes should pick up on.
   * The first footnote encountered will be listed with this
   * number, and the subsequent footnote encountered will be
   * listed with this number + 1, and so on.
   */
  footnotesCountingStart: number;
}

interface MarkdownToJsxResults {
  body: JsxComponent;
  footnotes: ReadonlyArray<FootnoteJsxComponent>;
  warnings: ReadonlyArray<string>;
}

export function convertMarkdownToJSX(
  markdown: string,
  {
    allExportedCounterIds,
    footnotesCountingStart,
    style,
  }: ConvertMarkdownToJsxOptions
): MarkdownToJsxResults {
  // Parse the provided Markdown
  const { hastSyntaxTree, warnings } = parseMarkdown(
    markdown,
    allExportedCounterIds,
    footnotesCountingStart
  );

  // Validate the syntax tree, if applicable
  if (style === MarkdownStyle.Inline) {
    const validationResult = validateInlineSyntaxTree(hastSyntaxTree);
    if (!validationResult.valid) {
      throw new Error("Invalid inline syntax tree.");
    }
  }

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

export function validateInlineMarkdown(
  markdown: string,
  allExportedCounterIds: ReadonlySet<string>
): ValidationResult {
  // Parse the provided Markdown
  const { hastSyntaxTree } = parseMarkdown(markdown, allExportedCounterIds, 0);

  // Run the validation
  return validateInlineSyntaxTree(hastSyntaxTree);
}

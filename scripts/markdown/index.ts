import { extractFootnotes } from "./extract-footnotes";
import { compileToJsx } from "./jsx-compiler/compiler";
import { parseMarkdown } from "./parsing/parse";
import { transformToInlineSyntaxTree } from "./transform-to-inline-tree";
import {
  HastSyntaxTree,
  JsxRepresentation,
  MarkdownStyle,
  ValidationResult,
} from "./types";
import { validateInlineSyntaxTree } from "./validate-inline";

export interface FootnoteJsxRepresentation extends JsxRepresentation {
  footnoteId: number;
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
  body: JsxRepresentation;
  footnotes: readonly FootnoteJsxRepresentation[];
  warnings: readonly string[];
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

  // Validate and transform the tree, as applicable
  let bodySyntaxTree: HastSyntaxTree;
  switch (style) {
    case MarkdownStyle.Block: {
      bodySyntaxTree = hastSyntaxTree;
      break;
    }
    case MarkdownStyle.Inline: {
      const validationResult = validateInlineSyntaxTree(hastSyntaxTree);
      if (!validationResult.valid) {
        throw new Error("Invalid inline syntax tree.");
      }

      bodySyntaxTree = transformToInlineSyntaxTree(hastSyntaxTree);
      break;
    }
  }

  // Extract the footnotes from the syntax tree to store them separately.
  const footnoteNodes = extractFootnotes(hastSyntaxTree);
  const footnotes = footnoteNodes.map(
    (node): FootnoteJsxRepresentation => ({
      footnoteId: node.refId,
      ...compileToJsx({
        children: [node.syntaxTree],
        type: "root",
      }),
    })
  );

  // Compile the body of the markdown to JSX
  const body = compileToJsx(bodySyntaxTree);

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

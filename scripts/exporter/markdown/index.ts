import path from "path";
import unified from "unified";
import parse from "remark-parse";
import ruby from "remark-ruby";

import { ROOT_DIRECTORY } from "../utils";

import embededImages from "./embeded-images";
import footnotes from "./footnotes";
import intrasiteLinkMarkdownPlugin from "./intrasite-link-plugin";
import mdashPlugin from "./mdash-plugin";
import superscriptPlugin from "./superscript-plugin";
import jsxCompiler, {
  assertJsxCompilerVFileData,
} from "./remark-compilers/jsx-compiler";
import footnoteExtractorCompiler, {
  assertFootnoteExtractorCompilerVFileData,
  Footnote,
} from "./remark-compilers/footnote-extractor-compiler";
import PluginWarningsCollector from "./PluginWarningsCollector";

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

const MARKDOWN_DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "./markdown-data");
const IMAGE_FILES_DIRECTORY = path.resolve(MARKDOWN_DATA_DIRECTORY, "./images");

function processMarkdown<TCompilerOptions, TVFileData>(
  markdown: string,
  exportedCounterIds: ReadonlySet<string>,
  footnotesCountingStart: number,
  pluginWarningsCollector: PluginWarningsCollector | null,
  compiler: (this: unified.Processor<unknown>) => void,
  dataAsserter: (value: unknown) => asserts value is TVFileData
): { output: string; data: TVFileData } {
  const result = unified()
    .use(parse)
    .use(footnotes, {
      footnotesCountingStart,
    })
    .use(embededImages, {
      rootDirectory: IMAGE_FILES_DIRECTORY,
    })
    .use(mdashPlugin)
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin, {
      exportedCounterIds,
      warningsCollector: pluginWarningsCollector,
    })
    .use(superscriptPlugin)
    .use(compiler)
    .processSync(markdown);
  dataAsserter(result.data);

  return {
    data: result.data,
    output: result.contents.toString(),
  };
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

function convertFootnoteToJsxComponent(
  footnote: Footnote
): FootnoteJsxComponent {
  return {
    footnoteId: footnote.refId,
    jsx: footnote.noteJsx.jsx,
    requiresCounterLink: footnote.noteJsx.containsCounterLink,
  };
}

export function convertMarkdownToJSX(
  markdown: string,
  options: ConvertMarkdownToJsxOptions
): MarkdownToJsxResults {
  // Process footnotes
  const { data: footnotesData } = processMarkdown(
    markdown,
    options.allExportedCounterIds,
    options.footnotesCountingStart,
    // Since we're processing the same data twice, don't capture
    // warnings twice. Chose to collect it on the main body pass-through
    // since that's the meat of the function.
    null,
    footnoteExtractorCompiler,
    assertFootnoteExtractorCompilerVFileData
  );

  // Process body
  const warningsCollector = new PluginWarningsCollector();
  const { data: bodyData, output } = processMarkdown(
    markdown,
    options.allExportedCounterIds,
    options.footnotesCountingStart,
    warningsCollector,
    jsxCompiler,
    assertJsxCompilerVFileData
  );

  return {
    body: {
      jsx: output,
      requiresCounterLink: bodyData.usesCounterLink,
    },
    footnotes: footnotesData.footnotes.map(convertFootnoteToJsxComponent),
    warnings: warningsCollector.warnings,
  };
}

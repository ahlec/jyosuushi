import unified from "unified";
import parse from "remark-parse";
import ruby from "remark-ruby";

import footnotes from "./footnotes";
import intrasiteLinkMarkdownPlugin from "./intrasite-link-plugin";
import jsxCompiler, {
  assertJsxCompilerVFileData
} from "./remark-compilers/jsx-compiler";
import footnoteExtractorCompiler, {
  assertFootnoteExtractorCompilerVFileData,
  Footnote
} from "./remark-compilers/footnote-extractor-compiler";

export interface JsxComponent {
  jsx: string;
  requiresReactRouterLink: boolean;
}

export interface FootnoteJsxComponent extends JsxComponent {
  footnoteId: number;
}

export interface MarkdownToJsxResults {
  body: JsxComponent;
  footnotes: ReadonlyArray<FootnoteJsxComponent>;
}

function processMarkdown<TCompilerOptions, TVFileData>(
  markdown: string,
  compiler: (
    this: unified.Processor<unknown>,
    options: TCompilerOptions
  ) => void,
  compilerOptions: TCompilerOptions,
  dataAsserter: (value: unknown) => asserts value is TVFileData
): { output: string; data: TVFileData } {
  const result = unified()
    .use(parse)
    .use(footnotes, {})
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin)
    .use(compiler, compilerOptions)
    .processSync(markdown);
  dataAsserter(result.data);

  return {
    data: result.data,
    output: result.contents.toString()
  };
}

interface ConvertMarkdownToJsxOptions {
  footnotesCountingStart: number;
}

function convertFootnoteToJsxComponent(
  footnote: Footnote
): FootnoteJsxComponent {
  return {
    footnoteId: footnote.globalRefId,
    jsx: footnote.noteJsx.jsx,
    requiresReactRouterLink: footnote.noteJsx.containsIntrasiteLink
  };
}

export function convertMarkdownToJSX(
  markdown: string,
  options: ConvertMarkdownToJsxOptions
): MarkdownToJsxResults {
  // Process footnotes
  const { data: footnotesData } = processMarkdown(
    markdown,
    footnoteExtractorCompiler,
    {
      refnoteStart: options.footnotesCountingStart
    },
    assertFootnoteExtractorCompilerVFileData
  );

  const footnoteLocalRefIdToGlobalId: {
    [localRefId: string]: number | undefined;
  } = {};
  for (const footnote of footnotesData.footnotes) {
    footnoteLocalRefIdToGlobalId[footnote.localRefId] = footnote.globalRefId;
  }

  // Process body
  const { data: bodyData, output } = processMarkdown(
    markdown,
    jsxCompiler,
    {
      footnoteLocalRefIdToGlobalId
    },
    assertJsxCompilerVFileData
  );

  return {
    body: {
      jsx: output,
      requiresReactRouterLink: bodyData.usesReactRouterLink
    },
    footnotes: footnotesData.footnotes.map(convertFootnoteToJsxComponent)
  };
}

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

export interface JsxResults {
  jsx: string;
  requiresReactRouterLink: boolean;
}

export interface ExtractFootnotesResults {
  footnotes: ReadonlyArray<Footnote>;
  footnoteLocalRefIdToGlobalId: { [localRefId: string]: number | undefined };
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

export function convertMarkdownToJSX(
  markdown: string,
  footnoteLocalRefIdToGlobalId: { [localRefId: string]: number | undefined }
): JsxResults {
  const { data, output } = processMarkdown(
    markdown,
    jsxCompiler,
    {
      footnoteLocalRefIdToGlobalId
    },
    assertJsxCompilerVFileData
  );

  return {
    jsx: output,
    requiresReactRouterLink: data.usesReactRouterLink
  };
}

export function retrieveFootnotesFromMarkdown(
  markdown: string,
  refnoteStart: number
): ExtractFootnotesResults {
  const { data } = processMarkdown(
    markdown,
    footnoteExtractorCompiler,
    {
      refnoteStart
    },
    assertFootnoteExtractorCompilerVFileData
  );

  const footnoteLocalRefIdToGlobalId: {
    [localRefId: string]: number | undefined;
  } = {};
  for (const footnote of data.footnotes) {
    footnoteLocalRefIdToGlobalId[footnote.localRefId] = footnote.globalRefId;
  }

  return {
    footnoteLocalRefIdToGlobalId,
    footnotes: data.footnotes
  };
}

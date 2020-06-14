import unified from "unified";
import { VFile } from "vfile";
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

function processMarkdown<TCompilerOptions>(
  markdown: string,
  compiler: (
    this: unified.Processor<unknown>,
    options: TCompilerOptions
  ) => void,
  compilerOptions: TCompilerOptions
): VFile {
  return unified()
    .use(parse)
    .use(footnotes, {})
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin)
    .use(compiler, compilerOptions)
    .processSync(markdown);
}

export function convertMarkdownToJSX(
  markdown: string,
  footnoteLocalRefIdToGlobalId: { [localRefId: string]: number | undefined }
): JsxResults {
  const result = processMarkdown(markdown, jsxCompiler, {
    footnoteLocalRefIdToGlobalId
  });

  assertJsxCompilerVFileData(result.data);

  return {
    jsx: result.contents.toString(),
    requiresReactRouterLink: result.data.usesReactRouterLink
  };
}

export function retrieveFootnotesFromMarkdown(
  markdown: string,
  refnoteStart: number
): ExtractFootnotesResults {
  const result = processMarkdown(markdown, footnoteExtractorCompiler, {
    refnoteStart
  });
  assertFootnoteExtractorCompilerVFileData(result.data);

  const footnoteLocalRefIdToGlobalId: {
    [localRefId: string]: number | undefined;
  } = {};
  for (const footnote of result.data.footnotes) {
    footnoteLocalRefIdToGlobalId[footnote.localRefId] = footnote.globalRefId;
  }

  return {
    footnoteLocalRefIdToGlobalId,
    footnotes: result.data.footnotes
  };
}

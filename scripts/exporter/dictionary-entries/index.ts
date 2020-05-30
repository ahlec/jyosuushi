import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";

import numericalSectionGroupMarkdownPlugin from "./numericalSectionGroupMarkdownPlugin";
import examplesMarkdownPlugin from "./examplesMarkdownPlugin";
import jsxCompiler from "./jsx-compiler";
import { JsxCompilerVFileData } from "./interfaces";

export interface DictionaryEntryJsx {
  doesRequireClassNamesLibrary: boolean;
  jsx: string;
}

function assertJsxCompilerVFileData(
  data: unknown
): asserts data is JsxCompilerVFileData {
  // Just... (sigh)
}

export function convertDictionaryEntryToJSX(
  markdown: string
): DictionaryEntryJsx {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(numericalSectionGroupMarkdownPlugin)
    .use(examplesMarkdownPlugin)
    .use(jsxCompiler)
    .processSync(markdown);

  assertJsxCompilerVFileData(result.data);

  return {
    doesRequireClassNamesLibrary: result.data.doesRequireClassNamesLibrary,
    jsx: result.contents.toString()
  };
}

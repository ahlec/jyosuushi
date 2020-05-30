import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";

import numericalSectionGroupMarkdownPlugin from "./numericalSectionGroupMarkdownPlugin";
import examplesMarkdownPlugin from "./examplesMarkdownPlugin";
import jsxCompiler from "./jsx-compiler";

export function convertDictionaryEntryToJSX(markdown: string): string {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(numericalSectionGroupMarkdownPlugin)
    .use(examplesMarkdownPlugin)
    .use(jsxCompiler)
    .processSync(markdown);
  return result.contents.toString();
}

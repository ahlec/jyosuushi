import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";

import examplesMarkdownPlugin from "./examplesMarkdownPlugin";
import jsxCompiler from "./jsx-compiler";

export function convertDictionaryEntryToJSX(markdown: string): string {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(examplesMarkdownPlugin)
    .use(jsxCompiler)
    .processSync(markdown);
  return result.contents.toString();
}

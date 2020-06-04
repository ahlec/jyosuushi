import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";

import jsxCompiler from "./jsx-compiler";

export function convertMarkdownToJSX(markdown: string): string {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(jsxCompiler)
    .processSync(markdown);
  return result.contents.toString();
}

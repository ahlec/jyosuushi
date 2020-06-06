import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";
import ruby from "remark-ruby";

import jsxCompiler from "./jsx-compiler";

export function convertMarkdownToJSX(markdown: string): string {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(ruby)
    .use(jsxCompiler)
    .processSync(markdown);
  return result.contents.toString();
}

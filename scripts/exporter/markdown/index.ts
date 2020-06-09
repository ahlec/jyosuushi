import unified from "unified";
import footnotes from "remark-footnotes";
import parse from "remark-parse";
import ruby from "remark-ruby";

import intrasiteLinkMarkdownPlugin from "./intrasite-link-plugin";
import jsxCompiler, { assertJsxCompilerVFileData } from "./jsx-compiler";

export interface JsxResults {
  jsx: string;
  requiresReactRouterLink: boolean;
}

export function convertMarkdownToJSX(markdown: string): JsxResults {
  const result = unified()
    .use(parse)
    .use(footnotes)
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin)
    .use(jsxCompiler)
    .processSync(markdown);

  assertJsxCompilerVFileData(result.data);

  return {
    jsx: result.contents.toString(),
    requiresReactRouterLink: result.data.usesReactRouterLink
  };
}

import unified from "unified";
import { VFile } from "vfile";
import footnotes from "remark-footnotes";
import parse from "remark-parse";
import ruby from "remark-ruby";

import intrasiteLinkMarkdownPlugin from "./intrasite-link-plugin";
import jsxCompiler, {
  assertJsxCompilerVFileData
} from "./remark-compilers/jsx-compiler";

export interface JsxResults {
  jsx: string;
  requiresReactRouterLink: boolean;
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
    .use(footnotes)
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin)
    .use(compiler, compilerOptions)
    .processSync(markdown);
}

export function convertMarkdownToJSX(
  markdown: string,
  footerReflinkPrefix: string
): JsxResults {
  const result = processMarkdown(markdown, jsxCompiler, {
    footerReflinkPrefix
  });

  assertJsxCompilerVFileData(result.data);

  return {
    jsx: result.contents.toString(),
    requiresReactRouterLink: result.data.usesReactRouterLink
  };
}

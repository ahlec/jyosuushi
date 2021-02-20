import toHast from "mdast-util-to-hast";
import path from "path";
import unified from "unified";
import { Node } from "unist";
import parse from "remark-parse";
import ruby from "remark-ruby";

import { ROOT_DIRECTORY } from "../../utils";

import { HastNode, HastSyntaxTree } from "../types";
import { isIndexableObject } from "../utils";

import embededImages from "./embeded-images";
import footnotes from "./footnotes";
import intrasiteLinkMarkdownPlugin from "./intrasite-link-plugin";
import mdashPlugin from "./mdash-plugin";
import superscriptPlugin from "./superscript-plugin";
import PluginWarningsCollector from "./PluginWarningsCollector";

const MARKDOWN_DATA_DIRECTORY = path.resolve(ROOT_DIRECTORY, "./markdown-data");
const IMAGE_FILES_DIRECTORY = path.resolve(MARKDOWN_DATA_DIRECTORY, "./images");

export interface ParseResult {
  hastSyntaxTree: HastSyntaxTree;
  warnings: readonly string[];
}

function assertIsHastNode(node: Node): asserts node is HastNode {
  // Check for "text" nodes
  if (node.type === "text") {
    if (typeof node.value !== "string") {
      throw new Error(
        `Encountered a "text" node where value = '${
          node.value
        }' (${typeof node.value})`
      );
    }

    return;
  }

  // Check for "element" nodes
  if (node.type === "element") {
    if (typeof node.tagName !== "string" || !node.tagName) {
      throw new Error(
        `Encountered an "element" node where tagName = '${
          node.tagName
        }' (${typeof node.tagName})`
      );
    }

    if (typeof node.properties !== "undefined") {
      if (
        !isIndexableObject(node.properties) ||
        Array.isArray(node.properties)
      ) {
        throw new Error(
          `Encountered an "element" node where properties looked strange (${typeof node.properties})`
        );
      }
    }

    if (!Array.isArray(node.children)) {
      throw new Error(
        `Encountered an "element" node where children wasn't a defined array (${typeof node.children})`
      );
    }

    node.children.forEach((child): void => {
      assertIsHastNode(child);
    });

    return;
  }

  // Unrecognized node type
  throw new Error(
    `Encountered an unexpected node type '${node.type}' (${typeof node.type})`
  );
}

function assertIsHastSyntaxTree(
  tree: Node
): asserts tree is HastSyntaxTree & { [key: string]: unknown } {
  if (tree.type !== "root") {
    throw new Error(
      `Encountered 'hast' syntax tree where type = '${tree.type}'`
    );
  }

  const { children } = tree;
  if (!children || !Array.isArray(children)) {
    throw new Error("Encountered 'hast' syntax tree without children defined");
  }

  children.forEach((child): void => {
    assertIsHastNode(child);
  });
}

export function parseMarkdown(
  markdown: string,
  exportedCounterIds: ReadonlySet<string>,
  footnotesCountingStart: number
): ParseResult {
  // Create a bucket for warnings
  const pluginWarningsCollector = new PluginWarningsCollector();

  // Configure the processor
  const processor = unified()
    .use(parse)
    .use(footnotes, {
      footnotesCountingStart,
    })
    .use(embededImages, {
      rootDirectory: IMAGE_FILES_DIRECTORY,
    })
    .use(mdashPlugin)
    .use(ruby)
    .use(intrasiteLinkMarkdownPlugin, {
      exportedCounterIds,
      warningsCollector: pluginWarningsCollector,
    })
    .use(superscriptPlugin);

  // Parse the Markdown into a syntax tree
  const parsedSyntaxTree = processor.parse(markdown);

  // Run the syntax tree through the processor to have the plugins work
  const mdastSyntaxTree = processor.runSync(parsedSyntaxTree);

  // Convert from MDAST to HAST
  const hastSyntaxTree = toHast(mdastSyntaxTree);
  assertIsHastSyntaxTree(hastSyntaxTree);

  // Return the parsed result
  return {
    hastSyntaxTree,
    warnings: pluginWarningsCollector.warnings,
  };
}

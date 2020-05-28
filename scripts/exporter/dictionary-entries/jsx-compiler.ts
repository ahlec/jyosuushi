import { Processor } from "unified";
import { Node } from "unist";
import toH, { Properties } from "hast-to-hyperscript";
import toHast, { Options as ToHastOptions } from "mdast-util-to-hast";

// @ts-ignore
import all from "mdast-util-to-hast/lib/all";

interface JSXRepresentation {
  childrenJsx: string;
  jsx: string;
  numChildNodes: number;
  tag: string;
}

function isIndexableObject(obj: unknown): obj is { [index: string]: unknown } {
  return typeof obj === "object" && obj !== null;
}

function isJsxRepresentation(child: unknown): child is JSXRepresentation {
  return isIndexableObject(child) && "jsx" in child;
}

function getChildAsJsx(child: unknown): string | null {
  if (typeof child === "string") {
    if (!child.trim()) {
      return null;
    }

    return child;
  }

  if (isJsxRepresentation(child)) {
    return child.jsx;
  }

  throw new Error("Unexpected child encountered.");
}

function isNotNull<T>(val: T | null): val is T {
  return val !== null;
}

function h(
  name: string,
  props: Properties | undefined,
  children: readonly unknown[] | undefined
): JSXRepresentation {
  const openingTagPieces: string[] = [name];
  if (props) {
    if (props.id) {
      openingTagPieces.push(`id="${props["id"]}"`);
    }

    if (props["class"]) {
      openingTagPieces.push(`className="${props["class"]}"`);
    }

    if (props["href"]) {
      openingTagPieces.push(`href="${props["href"]}"`);

      if (!props.href.startsWith("#")) {
        openingTagPieces.push('target="_blank"');
        openingTagPieces.push('rel="noopener noreferrer"');
      }
    }
  }

  let jsxChildren: string;
  let numChildNodes: number;
  if (children) {
    const consolidatedChildren = children.map(getChildAsJsx).filter(isNotNull);
    jsxChildren = consolidatedChildren.join("");
    numChildNodes = consolidatedChildren.length;
  } else {
    jsxChildren = "";
    numChildNodes = 0;
  }

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      childrenJsx: "",
      jsx: `<${openingTag} />`,
      numChildNodes: 0,
      tag: name
    };
  }

  return {
    childrenJsx: jsxChildren,
    jsx: `<${openingTag}>${jsxChildren}</${name}>`,
    numChildNodes,
    tag: name
  };
}

const TO_HAST_OPTIONS: Partial<ToHastOptions> = {
  handlers: {
    example: (...alll): Node => {
      const [h, node] = alll;
      const ret = h(node, "em", all(h, node));
      return ret;
    }
  }
};

function jsxCompiler(this: Processor<unknown>): void {
  this.Compiler = function compile(node: Node): string {
    const tree = toHast(node, TO_HAST_OPTIONS);
    const root = toH(h, tree);

    if (root.tag === "div") {
      if (root.numChildNodes <= 1) {
        return root.childrenJsx;
      }

      return `<React.Fragment>${root.childrenJsx}</React.Fragment>`;
    }

    return root.jsx;
  };
}

export default jsxCompiler;

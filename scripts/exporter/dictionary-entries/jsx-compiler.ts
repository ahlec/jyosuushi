import { Processor } from "unified";
import { VFile } from "vfile";
import { Node } from "unist";
import toH, { Properties } from "hast-to-hyperscript";
import toHast, { Options as ToHastOptions } from "mdast-util-to-hast";

// @ts-ignore
import all from "mdast-util-to-hast/lib/all";

import { JsxCompilerVFileData } from "./interfaces";

interface JSXRepresentation {
  childrenJsx: string;
  doesRequireClassNamesLibrary: boolean;
  jsx: string;
  numChildNodes: number;
  tag: string;
}

interface ComponentClass {
  value: string;
  isComponentProp: boolean;
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

function doesChildRequireClassNames(child: unknown): boolean {
  if (isJsxRepresentation(child)) {
    return child.doesRequireClassNamesLibrary;
  }

  return false;
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
  let doesRequireClassNamesLibrary: boolean;
  if (props) {
    if (props.id) {
      openingTagPieces.push(`id="${props["id"]}"`);
    }

    const classes: ComponentClass[] = [];
    if (props["class"]) {
      classes.push({
        isComponentProp: false,
        value: props["class"]
      });
    }

    if (props.propClassName) {
      classes.push({
        isComponentProp: true,
        value: props.propClassName
      });
    }

    if (classes.length) {
      const areAnyComponentProps = classes.some(
        ({ isComponentProp }) => isComponentProp
      );

      if (!areAnyComponentProps) {
        openingTagPieces.push(
          `className="${classes.map(({ value }) => value).join(" ")}"`
        );
        doesRequireClassNamesLibrary = false;
      } else if (classes.length === 1) {
        openingTagPieces.push(`className={this.props.${classes[0].value}}`);
        doesRequireClassNamesLibrary = false;
      } else {
        openingTagPieces.push(
          `className={classnames(${classes
            .map(({ isComponentProp, value }) =>
              isComponentProp ? `this.props.${value}` : `"${value}"`
            )
            .join(", ")})}`
        );
        doesRequireClassNamesLibrary = true;
      }
    } else {
      doesRequireClassNamesLibrary = false;
    }

    if (props["href"]) {
      openingTagPieces.push(`href="${props["href"]}"`);

      if (!props.href.startsWith("#")) {
        openingTagPieces.push('target="_blank"');
        openingTagPieces.push('rel="noopener noreferrer"');
      }
    }
  } else {
    doesRequireClassNamesLibrary = false;
  }

  let jsxChildren: string;
  let numChildNodes: number;
  if (children) {
    const consolidatedChildren = children.map(getChildAsJsx).filter(isNotNull);
    jsxChildren = consolidatedChildren.join("");
    numChildNodes = consolidatedChildren.length;

    if (!doesRequireClassNamesLibrary) {
      // If we don't ALREADY need it ourselves, check if a descendent does
      doesRequireClassNamesLibrary = children.some(doesChildRequireClassNames);
    }
  } else {
    jsxChildren = "";
    numChildNodes = 0;
  }

  const openingTag = openingTagPieces.join(" ");
  if (!jsxChildren) {
    return {
      childrenJsx: "",
      doesRequireClassNamesLibrary,
      jsx: `<${openingTag} />`,
      numChildNodes: 0,
      tag: name
    };
  }

  return {
    childrenJsx: jsxChildren,
    doesRequireClassNamesLibrary,
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
  this.Compiler = function compile(node: Node, file: VFile): string {
    const tree = toHast(node, TO_HAST_OPTIONS);
    const root = toH(h, tree);

    const data: JsxCompilerVFileData = {
      doesRequireClassNamesLibrary: root.doesRequireClassNamesLibrary
    };
    file.data = data;

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

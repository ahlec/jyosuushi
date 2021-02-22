export type HastNode =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "element";
      tagName: string;
      children: readonly HastNode[];
      properties?: Record<string, unknown>;
    };

export interface HastSyntaxTree {
  type: "root";
  children: readonly HastNode[];
}

export interface ValidationViolation {
  message: string;
  node: HastNode | HastSyntaxTree;
}

export type ValidationResult =
  | {
      valid: true;
    }
  | { valid: false; reasons: readonly ValidationViolation[] };

export enum MarkdownStyle {
  /**
   * Markdown elements that should be allowed to span multiple paragraphs
   * and include things such as lists would be "block" style. This provides
   * the full array of Markdown features.
   */
  Block = "block",

  /**
   * Markdown that is meant to be displayed only as inline text
   * would be "inline" style. This disallows access to certain elements like
   * lists, and will cause an error if the Markdown spans more than a single
   * paragraph.
   */
  Inline = "inline",
}

export interface JsxComponentUsage {
  counterDisplay: boolean;
  intrasiteLink: boolean;
}

export interface JsxRepresentation {
  componentUsage: JsxComponentUsage;
  jsx: string;
}

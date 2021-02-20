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

export interface IntrasiteLinkProps {
  counterId: string;
  specificKanji: string | null;
  specificReading: string | null;
}

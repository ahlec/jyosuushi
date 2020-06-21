export interface JSXRepresentation {
  childrenJsx: string;
  containsIntrasiteLink: boolean;
  jsx: string;
  numChildNodes: number;
  tag: string;
}

export interface Footnote {
  refId: string;
  backrefId: string;
}

export interface HastToHyperscriptProperties {
  ["class"]?: string;
  id?: string;
  href?: string;
  src?: string;
  alt?: string;
  to?: string;
}

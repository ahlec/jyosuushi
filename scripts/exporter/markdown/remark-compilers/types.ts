export interface JSXRepresentation {
  childrenJsx: string;
  containsCounterLink: boolean;
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
  intrasiteLink?: IntrasiteLinkProps;
}

export interface IntrasiteLinkProps {
  counterId: string;
}

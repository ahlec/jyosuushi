import { Node } from "unist";

export interface Properties {
  ["class"]?: string;
  id?: string;
  href?: string;
  propClassName?: keyof import("@jyosuushi/interfaces").DictionaryEntryComponentProps;
}

export default function toH<T>(
  h: (
    name: string,
    props: Properties | undefined,
    children: readonly unknown[] | undefined
  ) => T,
  tree: Node
): T;

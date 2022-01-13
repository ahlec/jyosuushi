import classnames from "classnames";
import * as React from "react";
import ReactMarkdown, { NodeType } from "react-markdown";

import styles from "./Markdown.scss";

interface ComponentProps {
  allowParagraphs?: boolean;
  className?: string;
  source: string;
}

const NO_DISALLOWED_TYPES: NodeType[] = [];
const DISALLOWED_TYPES: NodeType[] = ["paragraph"];

function Markdown({
  allowParagraphs = false,
  className,
  source,
}: ComponentProps): JSX.Element {
  return (
    <ReactMarkdown
      className={classnames(styles.markdown, className)}
      disallowedTypes={allowParagraphs ? NO_DISALLOWED_TYPES : DISALLOWED_TYPES}
      source={source}
      unwrapDisallowed={true}
    />
  );
}

export default Markdown;

import classnames from "classnames";
import * as React from "react";
import ReactMarkdown, { NodeType } from "react-markdown";

import styles from "./Markdown.scss";

interface ComponentProps {
  className?: string;
  source: string;
}

const DISALLOWED_TYPES: NodeType[] = ["paragraph"];

function Markdown({ className, source }: ComponentProps): JSX.Element {
  return (
    <ReactMarkdown
      className={classnames(styles.markdown, className)}
      disallowedTypes={DISALLOWED_TYPES}
      source={source}
      unwrapDisallowed={true}
    />
  );
}

export default Markdown;

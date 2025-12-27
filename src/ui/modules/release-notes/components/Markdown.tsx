import classnames from "classnames";
import * as React from "react";
import ReactMarkdown from "react-markdown";

import * as styles from "./Markdown.scss";

interface ComponentProps {
  allowParagraphs?: boolean;
  className?: string;
  source: string;
}

const NO_DISALLOWED_TYPES: readonly string[] = [];
const DISALLOWED_TYPES: readonly string[] = ["p"];

function Markdown({
  allowParagraphs = false,
  className,
  source,
}: ComponentProps): React.ReactElement {
  return (
    <div className={classnames(styles.markdown, className)}>
      <ReactMarkdown
        disallowedElements={
          allowParagraphs ? NO_DISALLOWED_TYPES : DISALLOWED_TYPES
        }
        unwrapDisallowed={true}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;

import * as React from "react";
import ReactMarkdown, { NodeType } from "react-markdown";

import "./Markdown.scss";

interface ComponentProps {
  source: string;
}

const DISALLOWED_TYPES: NodeType[] = ["paragraph"];

function Markdown({ source }: ComponentProps): JSX.Element {
  return (
    <ReactMarkdown
      className="Markdown"
      disallowedTypes={DISALLOWED_TYPES}
      source={source}
      unwrapDisallowed={true}
    />
  );
}

export default Markdown;

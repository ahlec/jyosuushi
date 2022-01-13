import React from "react";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import styles from "./FeedbackLink.scss";

interface ComponentProps {
  className: string;
  description: MessageDescriptor;
  icon: SvgIcon;
  text: MessageDescriptor;
  url: string;
}

function FeedbackLink({
  className,
  description,
  icon: Icon,
  text,
  url,
}: ComponentProps): React.ReactElement {
  return (
    <p className={className}>
      <a
        className={styles.feedbackLink}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.icon} />{" "}
        <FormattedMessage {...text} tagName="strong" />
      </a>
      {". "}
      <span className={styles.small}>
        <FormattedMessage {...description} />
      </span>
    </p>
  );
}

export default FeedbackLink;

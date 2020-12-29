import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import QuizPreparationView from "./QuizPreparationView";
import TutorialModal from "./TutorialModal";

import styles from "./PreparePage.scss";

const INTL_MESSAGES = defineMessages({
  linksJyosuushiWikipedia: {
    defaultMessage: "Japanese counters",
    id: "preparePage.links.jyosuushiWikipediaPage",
  },
  linksTutorial: {
    defaultMessage: "Click here to read the tutorial.",
    id: "preparePage.links.tutorial",
  },
  welcomeMessage: {
    defaultMessage:
      "Welcome to <bold>助数詞を練習</bold>! This is a tool that's meant to help you study {jyosuushiWikipediaLink}. You'll be given a random item and a random number, and then you tell us how you'd count that in Japanese. {tutorialLink}",
    id: "preparePage.welcomeMessage",
  },
});

function FormattedMessageBold(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return <strong>{chunks}</strong>;
}

const MOCK_ALL_COLLECTIONS_ARRAY: readonly CounterCollection[] = [];

function PreparePage(): React.ReactElement {
  // Define component state
  const [isShowingTutorial, setIsShowingTutorial] = useState<boolean>(false);

  // Handle events
  const handleOpenTutorialModalClick = useCallback(
    (): void => setIsShowingTutorial(true),
    []
  );

  const handleRequestTutorialModalClose = useCallback(
    (): void => setIsShowingTutorial(false),
    []
  );

  // Render the component
  return (
    <div className={styles.preparePage}>
      <FormattedMessage
        {...INTL_MESSAGES.welcomeMessage}
        values={{
          bold: FormattedMessageBold,
          jyosuushiWikipediaLink: (
            <a
              href="https://en.wikipedia.org/wiki/Japanese_counter_word"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage {...INTL_MESSAGES.linksJyosuushiWikipedia} />
            </a>
          ),
          tutorialLink: (
            <InlineTrigger onTrigger={handleOpenTutorialModalClick}>
              <FormattedMessage {...INTL_MESSAGES.linksTutorial} />
            </InlineTrigger>
          ),
        }}
        tagName="p"
      />
      <QuizPreparationView collections={MOCK_ALL_COLLECTIONS_ARRAY} />
      <div className={styles.flex} />
      <TutorialModal
        isOpen={isShowingTutorial}
        onRequestClose={handleRequestTutorialModalClose}
      />
    </div>
  );
}

export default PreparePage;

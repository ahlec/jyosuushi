import React, { useCallback, useMemo, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import {
  CounterCollection,
  useAvailableCounterCollectionsQuery,
} from "@jyosuushi/graphql/types.generated";

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

function PreparePage(): React.ReactElement {
  // Define component state
  const [isShowingTutorial, setIsShowingTutorial] = useState<boolean>(false);

  // Retrieve the necessary data from the server
  const { data, error, loading } = useAvailableCounterCollectionsQuery();
  const collections = useMemo((): readonly CounterCollection[] => {
    if (!data) {
      return [];
    }

    return [...data.standardCounterCollections, ...data.userCounterCollections];
  }, [data]);

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
      {!loading && !error && <QuizPreparationView collections={collections} />}
      <div className={styles.flex} />
      <TutorialModal
        isOpen={isShowingTutorial}
        onRequestClose={handleRequestTutorialModalClose}
      />
    </div>
  );
}

export default PreparePage;

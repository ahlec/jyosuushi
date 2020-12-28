import { noop } from "lodash";
import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import useQuizManager from "@jyosuushi/quiz/useQuizManager";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import CollectionSelection from "./CollectionSelection";
import CounterPreview from "./CounterPreview";
import TutorialModal from "./TutorialModal";
import useDistinctCounters from "./useDistinctCounters";

import styles from "./PreparePage.scss";

const INTL_MESSAGES = defineMessages({
  buttonStartQuiz: {
    defaultMessage: "Start Quiz!",
    id: "preparePage.buttonStartQuiz",
  },
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

const MOCK_COLLECTIONS_ARRAY: readonly CounterCollection[] = [];
const MOCK_SELECTED_COLLECTION_IDS: ReadonlySet<string> = new Set();

function PreparePage(): React.ReactElement {
  // Define component state
  const [isShowingTutorial, setIsShowingTutorial] = useState<boolean>(false);

  // Connect with the rest of the app
  const quizManager = useQuizManager();

  // Handle events
  const handleOpenTutorialModalClick = useCallback(
    (): void => setIsShowingTutorial(true),
    []
  );

  const handleRequestTutorialModalClose = useCallback(
    (): void => setIsShowingTutorial(false),
    []
  );

  const handleStartQuiz = useCallback((): void => {
    quizManager.startNewQuiz();
  }, [quizManager]);

  // Collate the counters that will be quizzed on, based on selected collections
  const selectedCounters = useDistinctCounters(MOCK_COLLECTIONS_ARRAY);

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
      <CollectionSelection
        collections={MOCK_COLLECTIONS_ARRAY}
        currentlySelectedCollectionIds={MOCK_SELECTED_COLLECTION_IDS}
        onSelectionChange={noop}
      />
      <div className={styles.start}>
        <FormattedMessage {...INTL_MESSAGES.buttonStartQuiz}>
          {(text) => (
            <button
              disabled={MOCK_SELECTED_COLLECTION_IDS.size > 0}
              onClick={handleStartQuiz}
            >
              {text}
            </button>
          )}
        </FormattedMessage>
      </div>
      <CounterPreview
        className={styles.counterPreview}
        counters={selectedCounters}
      />
      <div className={styles.flex} />
      <TutorialModal
        isOpen={isShowingTutorial}
        onRequestClose={handleRequestTutorialModalClose}
      />
    </div>
  );
}

export default PreparePage;

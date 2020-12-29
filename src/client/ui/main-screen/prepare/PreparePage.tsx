import React, { useCallback, useMemo, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";
import { getCurrentQuizMode } from "@jyosuushi/redux/selectors";

import useQuizManager from "@jyosuushi/quiz/useQuizManager";
import { getDistinctCounters } from "@jyosuushi/utils";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import CollectionSelection from "./CollectionSelection";
import CounterPreview from "./CounterPreview";
import TutorialModal from "./TutorialModal";
import useSelectedCollections from "./useSelectedCollections";

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

const MOCK_ALL_COLLECTIONS_ARRAY: readonly CounterCollection[] = [];

function PreparePage(): React.ReactElement {
  // Define component state
  const [isShowingTutorial, setIsShowingTutorial] = useState<boolean>(false);

  // Connect with the rest of the app
  const quizManager = useQuizManager();
  const {
    selectedCollectionIds,
    selectedCollections,
    setSelectedCollectionIds,
  } = useSelectedCollections(MOCK_ALL_COLLECTIONS_ARRAY);
  const quizMode = useSelector(getCurrentQuizMode);

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
    quizManager.startNewQuiz(selectedCollections, quizMode);
  }, [quizManager, selectedCollections, quizMode]);

  // Collate the counters that will be quizzed on, based on selected collections
  const selectedCounters = useMemo(
    () => getDistinctCounters(selectedCollections),
    [selectedCollections]
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
      <CollectionSelection
        collections={MOCK_ALL_COLLECTIONS_ARRAY}
        currentlySelectedCollectionIds={selectedCollectionIds}
        onSelectionChange={setSelectedCollectionIds}
      />
      <div className={styles.start}>
        <FormattedMessage {...INTL_MESSAGES.buttonStartQuiz}>
          {(text) => (
            <button
              disabled={!selectedCollections.length}
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

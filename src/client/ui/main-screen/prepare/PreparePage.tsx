import React, { useCallback, useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import useQuizManager from "@jyosuushi/quiz/useQuizManager";

import InlineTrigger from "@jyosuushi/ui/components/InlineTrigger";

import CounterPreview from "./CounterPreview";
import PackSelection from "./PackSelection";
import TutorialModal from "./TutorialModal";
import useEnabledPacks from "./useEnabledPacks";

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

function PreparePage(): React.ReactElement {
  // Define component state
  const [isShowingTutorial, setIsShowingTutorial] = useState<boolean>(false);

  // Connect with the rest of the app
  const quizManager = useQuizManager();
  const [enabledPacks, setEnabledPacks] = useEnabledPacks();

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
      <PackSelection
        onSelectionChanged={setEnabledPacks}
        selection={enabledPacks}
      />
      <div className={styles.start}>
        <FormattedMessage {...INTL_MESSAGES.buttonStartQuiz}>
          {(text) => (
            <button disabled={!enabledPacks.length} onClick={handleStartQuiz}>
              {text}
            </button>
          )}
        </FormattedMessage>
      </div>
      <CounterPreview className={styles.counterPreview} packs={enabledPacks} />
      <div className={styles.flex} />
      <TutorialModal
        isOpen={isShowingTutorial}
        onRequestClose={handleRequestTutorialModalClose}
      />
    </div>
  );
}

export default PreparePage;

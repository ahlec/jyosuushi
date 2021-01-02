import React, { useCallback, useMemo } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";
import { getCurrentQuizMode } from "@jyosuushi/redux/selectors";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import useQuizManager from "@jyosuushi/quiz/useQuizManager";
import { getDistinctCounters } from "@jyosuushi/utils";

import CollectionSelection from "./CollectionSelection";
import CounterPreview from "./CounterPreview";
import useSelectedCollections from "./useSelectedCollections";

import styles from "./QuizPreparationView.scss";

const INTL_MESSAGES = defineMessages({
  buttonStartQuiz: {
    defaultMessage: "Start Quiz!",
    id: "preparePage.QuizPreparationView.buttonStartQuiz",
  },
});

interface ComponentProps {
  collections: readonly CounterCollection[];
}

function QuizPreparationView({
  collections,
}: ComponentProps): React.ReactElement {
  // Connect with the rest of the app
  const quizManager = useQuizManager();
  const {
    selectedCollectionIds,
    selectedCollections,
    setSelectedCollectionIds,
  } = useSelectedCollections(collections);
  const quizMode = useSelector(getCurrentQuizMode);

  // Handle events
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
    <div className={styles.quizPreparationView}>
      <CollectionSelection
        collections={collections}
        currentlySelectedCollectionIds={selectedCollectionIds}
        onSelectionChange={setSelectedCollectionIds}
      />
      <div className={styles.startButtonContainer}>
        <FormattedMessage {...INTL_MESSAGES.buttonStartQuiz}>
          {(text) => (
            <StandardButton
              className={styles.startButton}
              disabled={!selectedCollections.length}
              onClick={handleStartQuiz}
            >
              {text}
            </StandardButton>
          )}
        </FormattedMessage>
      </div>
      <CounterPreview
        className={styles.counterPreview}
        counters={selectedCounters}
      />
    </div>
  );
}

export default QuizPreparationView;

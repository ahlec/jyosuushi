import * as React from "react";

import { ITEMS_LOOKUP } from "@data/items";
import { Question } from "@jyosuushi/interfaces";

import styles from "./QuestionDisplay.scss";
import useLocale from "@jyosuushi/i18n/useLocale";

interface ComponentProps {
  currentQuestion: Question;
}

function QuestionDisplay({
  currentQuestion,
}: ComponentProps): React.ReactElement {
  const item = ITEMS_LOOKUP[currentQuestion.itemId];

  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <div className={styles.questionDisplay}>
      {currentQuestion.amount}{" "}
      {locale.dataLocalizers.getItemName(item, currentQuestion.amount)}
    </div>
  );
}

export default QuestionDisplay;

import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { ITEMS_LOOKUP } from "@data/items";
import { Question } from "@jyosuushi/interfaces";

import * as styles from "./QuestionDisplay.scss";
import useLocale from "@jyosuushi/i18n/useLocale";

interface ComponentProps {
  currentQuestion: Question;
}

const INTL_MESSAGES = defineMessages({
  questionDisplay: {
    defaultMessage: "{amount} {itemName}",
    id: "quizPage.QuestionDisplay.text",
  },
});

function QuestionDisplay({
  currentQuestion,
}: ComponentProps): React.ReactElement {
  const item = ITEMS_LOOKUP[currentQuestion.itemId];

  // Connect to the rest of the app
  const locale = useLocale();

  // Render the component
  return (
    <FormattedMessage
      {...INTL_MESSAGES.questionDisplay}
      values={{
        amount: currentQuestion.amount,
        itemName: locale.dataLocalizers.getItemName(
          item,
          currentQuestion.amount
        ),
      }}
    >
      {(text) => <div className={styles.questionDisplay}>{text}</div>}
    </FormattedMessage>
  );
}

export default QuestionDisplay;

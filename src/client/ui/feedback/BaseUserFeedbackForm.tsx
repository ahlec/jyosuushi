import { MutationHookOptions, MutationTuple } from "@apollo/client";
import React, { useState } from "react";
import {
  defineMessages,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";

import {
  MAX_USER_FEEDBACK_MESSAGE_LENGTH,
  MIN_USER_FEEDBACK_MESSAGE_LENGTH,
} from "@shared/constants";

import StandardButton from "@jyosuushi/ui/components/StandardButton";

import useToast from "@jyosuushi/ui/toasts/useToast";

import styles from "./BaseUserFeedbackForm.scss";

const CONSECUTIVE_WHITESPACE_REGEX = /\s+/g;

function sanitizeUserInput(raw: string): string {
  return raw.replace(CONSECUTIVE_WHITESPACE_REGEX, " ");
}

interface MutationData {
  result: {
    success: boolean;
  };
}

interface ComponentProps {
  /**
   * Localized text to appear at the top of the form to
   * set the stage for what the user should do here.
   */
  explanation: MessageDescriptor;

  /**
   * The strongly-typed GraphQL Apollo mutation hook that should
   * be used to submit this user's feedback.
   */
  mutationHook: (
    options?: MutationHookOptions
  ) => MutationTuple<
    MutationData,
    { clientVersion: string; message: string; userAgent: string }
  >;

  /**
   * An optional callback to be invoked when the user has successfully
   * submitted their feedback.
   */
  onSuccess?: () => void;

  /**
   * Localized text to be opened as a toast in the application when
   * the user has successfully submitted their feedback.
   */
  successToast: MessageDescriptor;
}

const INTL_MESSAGES = defineMessages({
  buttonClearMessage: {
    defaultMessage: "Clear",
    id: "feedback.BaseUserFeedbackForm.buttons.clearMessage",
  },
  buttonSubmit: {
    defaultMessage: "Submit",
    id: "feedback.BaseUserFeedbackForm.buttons.submit",
  },
  errorServerCommunication: {
    defaultMessage:
      "There was an error with the server when trying to submit your feedback. Please try again later.",
    id: "feedback.BaseUserFeedbackForm.errors.serverCommunicationFailed",
  },
  errorSubmissionFailed: {
    defaultMessage: "Your feedback was unable to be saved. Please try again.",
    description:
      "Could communicate with the server, but the server rejected the submission because of validation reasons.",
    id: "feedback.BaseUserFeedbackForm.errors.submissionFailed",
  },
  messageFieldLabel: {
    defaultMessage: "Message",
    id: "feedback.BaseUserFeedbackForm.fields.message.label",
  },
  messageFieldNumRemainingCharacters: {
    defaultMessage:
      "You have {numRemaining, plural, one {# character} other {# characters}} remaining.",
    id: "feedback.BaseUserFeedbackForm.fields.message.numRemainingCharacters",
  },
  messageFieldValidationTooLong: {
    defaultMessage: "Your message is too long to submit.",
    id: "feedback.BaseUserFeedbackForm.fields.message.validation.tooLong",
  },
  messageFieldValidationTooShort: {
    defaultMessage:
      "Your message requires {numMoreCharactersRequired, plural, one {# more character} other {# more characters}}.",
    id: "feedback.BaseUserFeedbackForm.fields.message.validation.tooShort",
  },
});

function getMessageContextFooterText(
  sanitizedMessageLength: number
): React.ReactElement {
  if (sanitizedMessageLength < MIN_USER_FEEDBACK_MESSAGE_LENGTH) {
    return (
      <FormattedMessage
        {...INTL_MESSAGES.messageFieldValidationTooShort}
        values={{
          numMoreCharactersRequired:
            MIN_USER_FEEDBACK_MESSAGE_LENGTH - sanitizedMessageLength,
        }}
      />
    );
  }

  if (sanitizedMessageLength < MAX_USER_FEEDBACK_MESSAGE_LENGTH) {
    return (
      <FormattedMessage
        {...INTL_MESSAGES.messageFieldNumRemainingCharacters}
        values={{
          numRemaining:
            MAX_USER_FEEDBACK_MESSAGE_LENGTH - sanitizedMessageLength,
        }}
      />
    );
  }

  return <FormattedMessage {...INTL_MESSAGES.messageFieldValidationTooLong} />;
}

function BaseUserFeedbackForm({
  explanation,
  mutationHook,
  onSuccess,
  successToast,
}: ComponentProps): React.ReactElement {
  // Define state
  const [userInput, setUserInput] = useState<string>("");

  // Derive data
  const sanitizedMessage = sanitizeUserInput(userInput);
  const canUserSubmit =
    sanitizedMessage.length >= MIN_USER_FEEDBACK_MESSAGE_LENGTH &&
    sanitizedMessage.length <= MAX_USER_FEEDBACK_MESSAGE_LENGTH;

  // Connect with the rest of the app
  const { openToast } = useToast();

  // Integrate with GraphQL
  const [
    submitFeedback,
    { data: mutationResults, error: mutationError, loading: isMutating },
  ] = mutationHook({
    onCompleted: (data: MutationData) => {
      if (data.result.success) {
        setUserInput("");
        openToast({
          message: successToast,
          variant: "success",
        });

        if (onSuccess) {
          onSuccess();
        }
      }
    },
  });

  // Handle events
  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (isMutating) {
      return;
    }

    setUserInput(e.target.value);
  };

  const handleClearClick = (): void => {
    if (isMutating) {
      return;
    }

    setUserInput("");
  };

  const handleSubmitClick = async (): Promise<void> => {
    if (!canUserSubmit || isMutating) {
      return;
    }

    submitFeedback({
      variables: {
        clientVersion: JYOSUUSHI_CURRENT_SEMVER,
        message: sanitizedMessage,
        userAgent: navigator.userAgent,
      },
    });
  };

  // Render form
  return (
    <div className={styles.baseUserFeedbackForm}>
      <p className={styles.explanation}>
        <FormattedMessage {...explanation} />
      </p>
      <label className={styles.messageInput}>
        <FormattedMessage {...INTL_MESSAGES.messageFieldLabel}>
          {(text) => <div className={styles.fieldLabel}>{text}</div>}
        </FormattedMessage>
        <textarea
          className={styles.inputElement}
          disabled={isMutating}
          onChange={handleTextareaChange}
          value={userInput}
        />
        <div className={styles.contextFooter}>
          {getMessageContextFooterText(sanitizedMessage.length)}
        </div>
      </label>
      <div className={styles.actionButtons}>
        {!!userInput && (
          <StandardButton disabled={isMutating} onClick={handleClearClick}>
            <FormattedMessage {...INTL_MESSAGES.buttonClearMessage} />
          </StandardButton>
        )}
        <StandardButton
          disabled={isMutating || !canUserSubmit}
          onClick={handleSubmitClick}
        >
          <FormattedMessage {...INTL_MESSAGES.buttonSubmit} />
        </StandardButton>
      </div>
      {mutationError ? (
        <div className={styles.errorContainer}>
          <FormattedMessage {...INTL_MESSAGES.errorServerCommunication} />
        </div>
      ) : !!mutationResults && !mutationResults.result.success ? (
        <div className={styles.errorContainer}>
          <FormattedMessage {...INTL_MESSAGES.errorSubmissionFailed} />
        </div>
      ) : null}
    </div>
  );
}

export default BaseUserFeedbackForm;

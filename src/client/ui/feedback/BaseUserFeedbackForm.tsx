import { MutationHookOptions, MutationTuple } from "@apollo/client";
import classnames from "classnames";
import React, { useState } from "react";

import {
  MAX_USER_FEEDBACK_MESSAGE_LENGTH,
  MIN_USER_FEEDBACK_MESSAGE_LENGTH,
} from "@shared/constants";

import "./BaseUserFeedbackForm.scss";

const CONSECUTIVE_WHITESPACE_REGEX = /\s+/g;

function sanitizeUserInput(raw: string): string {
  return raw.replace(CONSECUTIVE_WHITESPACE_REGEX, " ");
}

interface ComponentProps {
  /**
   * Localized text to appear at the top of the form to
   * set the stage for what the user should do here.
   */
  explanation: string;

  /**
   * The strongly-typed GraphQL Apollo mutation hook that should
   * be used to submit this user's feedback.
   */
  mutationHook: (
    options?: MutationHookOptions
  ) => MutationTuple<
    { result: { success: boolean } },
    { clientVersion: string; message: string; userAgent: string }
  >;

  /**
   * Localized text to appear at the bottom of the form
   * if the user has successfully submitted their feedback.
   */
  successMessage: string;
}

function getMessageContextFooterText(sanitizedMessageLength: number): string {
  if (sanitizedMessageLength < MIN_USER_FEEDBACK_MESSAGE_LENGTH) {
    const numRequiredCharacters =
      MIN_USER_FEEDBACK_MESSAGE_LENGTH - sanitizedMessageLength;
    return `Your message requires ${numRequiredCharacters} more ${
      numRequiredCharacters === 1 ? "character" : "characters"
    }.`;
  }

  if (sanitizedMessageLength < MAX_USER_FEEDBACK_MESSAGE_LENGTH) {
    const numRemainingCharacters =
      MAX_USER_FEEDBACK_MESSAGE_LENGTH - sanitizedMessageLength;
    return `You have ${numRemainingCharacters} ${
      numRemainingCharacters === 1 ? "character" : "characters"
    } remaining.`;
  }

  return "Your message is too long to submit.";
}

function BaseUserFeedbackForm({
  explanation,
  mutationHook,
  successMessage,
}: ComponentProps): React.ReactElement {
  // Define state
  const [userInput, setUserInput] = useState<string>("");

  // Derive data
  const sanitizedMessage = sanitizeUserInput(userInput);
  const canUserSubmit =
    sanitizedMessage.length >= MIN_USER_FEEDBACK_MESSAGE_LENGTH &&
    sanitizedMessage.length <= MAX_USER_FEEDBACK_MESSAGE_LENGTH;

  //
  const [
    reportBug,
    { data: mutationResult, loading: isMutating },
  ] = mutationHook({
    onCompleted: () => setUserInput(""),
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

    reportBug({
      variables: {
        clientVersion: JYOSUUSHI_CURRENT_SEMVER,
        message: sanitizedMessage,
        userAgent: navigator.userAgent,
      },
    });
  };

  // Render form
  return (
    <div className="BaseUserFeedbackForm">
      <p className="explanation">{explanation}</p>
      <label className="message-input">
        <div className="field-label">Message</div>
        <textarea
          className="input-element"
          disabled={isMutating}
          onChange={handleTextareaChange}
          value={userInput}
        />
        <div
          className={classnames(
            "context-footer",
            canUserSubmit && "can-submit"
          )}
        >
          {getMessageContextFooterText(sanitizedMessage.length)}
        </div>
      </label>
      <div className="action-buttons">
        {!!userInput && (
          <button className="secondary" onClick={handleClearClick}>
            Clear
          </button>
        )}
        <button
          className="primary"
          disabled={isMutating || !canUserSubmit}
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </div>
      {!!mutationResult && mutationResult.result.success && (
        <div className="success-container">{successMessage}</div>
      )}
    </div>
  );
}

export default BaseUserFeedbackForm;

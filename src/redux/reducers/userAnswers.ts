import { CounterFrequency } from "@jyosuushi/interfaces";
import { UserAnswer } from "@jyosuushi/redux";
import { ReduxAction } from "@jyosuushi/redux/actions";

export default function userAnswersReducer(
  state: ReadonlyArray<UserAnswer> | undefined = [],
  action: ReduxAction,
): ReadonlyArray<UserAnswer> {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
      return [];
    case "submit-correct-answer":
      return [
        ...state,
        action.readingFrequency === CounterFrequency.Common
          ? {
              input: action.providedAnswer,
              judgment: "correct",
            }
          : {
              input: action.providedAnswer,
              judgment: "correct-but-uncommon",
              readingFrequency: action.readingFrequency,
            },
      ];
    case "submit-incorrect-answer":
      return [
        ...state,
        {
          input: action.providedAnswer,
          judgment: "incorrect",
          readingFrequency: action.readingFrequency,
        },
      ];
    case "ignore-last-answer": {
      const next = [...state];
      const last = next[next.length - 1];
      if (!last) {
        // Empty. Shouldn't happen, but protect
        return state;
      }

      if (last.judgment !== "incorrect") {
        // Shouldn't happen, but let's be defensive
        return state;
      }

      next[next.length - 1] = {
        input: last.input,
        judgment: "ignored",
        readingFrequency: last.readingFrequency,
      };
      return next;
    }
    case "skip-question":
      return [
        ...state,
        {
          input: null,
          judgment: "skipped",
        },
      ];
    default:
      return state;
  }
}

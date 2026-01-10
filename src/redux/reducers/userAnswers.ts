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
        {
          input: action.providedAnswer,
          judgment:
            action.readingFrequency === CounterFrequency.Common
              ? "correct"
              : "correct-but-uncommon",
          readingFrequency: action.readingFrequency,
        },
      ];
    case "submit-incorrect-answer":
      return [
        ...state,
        {
          input: action.providedAnswer,
          judgment: "incorrect",
        },
      ];
    case "ignore-last-answer": {
      if (!state.length) {
        return state;
      }

      const next = [...state];
      next[next.length - 1] = {
        input: next[next.length - 1].input,
        judgment: "ignored",
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

import {
  ActionIgnoreLastAnswer,
  ActionRestartQuiz,
  ActionSkipQuestion,
  ActionStartQuiz,
  ActionSubmitCorrectAnswer,
  ActionSubmitIncorrectAnswer
} from "../actions";
import { UserActionJudgment, UserAnswer } from "../index";

type ReducerAction =
  | ActionIgnoreLastAnswer
  | ActionRestartQuiz
  | ActionSkipQuestion
  | ActionStartQuiz
  | ActionSubmitCorrectAnswer
  | ActionSubmitIncorrectAnswer;

function updateJudgmentOnLast(
  state: ReadonlyArray<UserAnswer>,
  judgment: UserActionJudgment
): ReadonlyArray<UserAnswer> {
  if (!state || !state.length) {
    // shouldn't happen, but let's just check
    return state;
  }

  const next = [...state];
  next[next.length - 1].judgment = judgment;
  return next;
}

export default function userAnswersReducer(
  state: ReadonlyArray<UserAnswer> | undefined = [],
  action: ReducerAction
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
          judgment: "correct"
        }
      ];
    case "submit-incorrect-answer":
      return [
        ...state,
        {
          input: action.providedAnswer,
          judgment: "incorrect"
        }
      ];
    case "ignore-last-answer":
      return updateJudgmentOnLast(state, "ignored");
    case "skip-question":
      return [
        ...state,
        {
          input: null,
          judgment: "skipped"
        }
      ];
    default:
      return state;
  }
}

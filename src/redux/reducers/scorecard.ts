import { maxBy } from "lodash";
import {
  ActionIgnoreLastAnswer,
  ActionLeaveQuiz,
  ActionRestartQuiz,
  ActionSkipQuestion,
  ActionStartQuiz,
  ActionSubmitCorrectAnswer,
  ActionSubmitIncorrectAnswer
} from "../actions";
import { Scorecard } from "../index";

type ReducerAction =
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionLeaveQuiz
  | ActionSubmitCorrectAnswer
  | ActionSubmitIncorrectAnswer
  | ActionIgnoreLastAnswer
  | ActionSkipQuestion;

const DEFAULT_SCORECARD: Scorecard = {
  missedCounterTallies: {},
  mostMissedCounterId: null,
  numCorrectAnswers: 0,
  numIgnoredAnswers: 0,
  numIncorrectAnswers: 0,
  numSkippedQuestions: 0
};

export default function scorecardReducer(
  state: Scorecard | undefined = DEFAULT_SCORECARD,
  action: ReducerAction
): Scorecard {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
    case "leave-quiz":
      return DEFAULT_SCORECARD;
    case "submit-correct-answer": {
      return {
        ...state,
        numCorrectAnswers: state.numCorrectAnswers + 1
      };
    }
    case "submit-incorrect-answer": {
      const nextCounterTallies = { ...state.missedCounterTallies };
      for (const counterId of action.possibleCounters) {
        nextCounterTallies[counterId] =
          (nextCounterTallies[counterId] || 0) + 1;
      }
      const mostMissedCounterId = maxBy(
        Object.keys(nextCounterTallies),
        (counterId: string) => nextCounterTallies[counterId]
      )!;
      return {
        ...state,
        missedCounterTallies: nextCounterTallies,
        mostMissedCounterId,
        numIncorrectAnswers: state.numIncorrectAnswers + 1
      };
    }
    case "ignore-last-answer": {
      const nextCounterTallies = { ...state.missedCounterTallies };
      for (const counterId of action.possibleCounters) {
        const newCount = (nextCounterTallies[counterId] || 0) - 1;
        if (newCount <= 0) {
          delete nextCounterTallies[counterId];
        } else {
          nextCounterTallies[counterId] = newCount;
        }
      }
      const mostMissedCounterId = maxBy(
        Object.keys(nextCounterTallies),
        (counterId: string) => nextCounterTallies[counterId]
      )!;
      return {
        ...state,
        missedCounterTallies: nextCounterTallies,
        mostMissedCounterId,
        numIgnoredAnswers: state.numIgnoredAnswers + 1,
        numIncorrectAnswers: Math.max(0, state.numIncorrectAnswers - 1)
      };
    }
    case "skip-question": {
      return {
        ...state,
        numSkippedQuestions: state.numSkippedQuestions + 1
      };
    }
    default:
      return state;
  }
}

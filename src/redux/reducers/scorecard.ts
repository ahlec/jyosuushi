import { maxBy } from "lodash";
import {
  ActionEndQuiz,
  ActionMarkCorrectAnswer,
  ActionMarkIncorrectAnswer,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { Scorecard } from "../index";

type ReducerAction =
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionEndQuiz
  | ActionMarkCorrectAnswer
  | ActionMarkIncorrectAnswer;

const DEFAULT_SCORECARD: Scorecard = {
  missedCounterTallies: {},
  mostMissedCounterId: null,
  numCorrectAnswers: 0,
  numQuestionsAsked: 0
};

export default function scorecardReducer(
  state: Scorecard | undefined = DEFAULT_SCORECARD,
  action: ReducerAction
): Scorecard {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
    case "end-quiz":
      return DEFAULT_SCORECARD;
    case "mark-correct-answer": {
      return {
        missedCounterTallies: state.missedCounterTallies,
        mostMissedCounterId: state.mostMissedCounterId,
        numCorrectAnswers: state.numCorrectAnswers + 1,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    }
    case "mark-incorrect-answer": {
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
        missedCounterTallies: nextCounterTallies,
        mostMissedCounterId,
        numCorrectAnswers: state.numCorrectAnswers,
        numQuestionsAsked: state.numQuestionsAsked + 1
      };
    }
    default:
      return state;
  }
}

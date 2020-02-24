import { memoize, random } from "lodash";

import { COUNTERS_LOOKUP } from "@data/counters";
import { ITEMS_LOOKUP } from "@data/items";

import { Answer, PendingQuestion, Question } from "@jyosuushi/interfaces";
import {
  conjugateCounter,
  getDistinctCounters,
  randomFromArray
} from "@jyosuushi/utils";

import { QuestionsState } from "@jyosuushi/redux";
import {
  ActionIgnoreLastAnswer,
  ActionNextQuestion,
  ActionReplenishInfiniteQuiz,
  ActionRestartQuiz,
  ActionSetEnabledPacks,
  ActionStartQuiz
} from "@jyosuushi/redux/actions";

const getEnabledCountersSet = memoize(
  (enabledCounters: ReadonlyArray<string>) => new Set<string>(enabledCounters)
);

function makeQuestion(
  { itemId, possibleAmounts }: PendingQuestion,
  enabledCounters: ReadonlyArray<string>
): Question {
  const amount = randomFromArray(possibleAmounts);

  const enabledCountersSet = getEnabledCountersSet(enabledCounters);
  const counters = ITEMS_LOOKUP[itemId].counters
    .map(({ counterId }) => counterId)
    .filter(counterId => enabledCountersSet.has(counterId))
    .map(counterId => COUNTERS_LOOKUP[counterId]);
  const validAnswers: Answer[] = [];
  for (const counter of counters) {
    const answers = conjugateCounter(amount, counter);
    for (const answer of answers) {
      validAnswers.push({
        ...answer,
        counterId: counter.counterId
      });
    }
  }

  return {
    amount,
    itemId,
    possibleAmounts,
    validAnswers
  };
}

type ReducerAction =
  | ActionSetEnabledPacks
  | ActionStartQuiz
  | ActionReplenishInfiniteQuiz
  | ActionRestartQuiz
  | ActionNextQuestion
  | ActionIgnoreLastAnswer;

const DEFAULT_STATE: QuestionsState = {
  asked: [],
  currentQuestion: null,
  enabledCounters: [],
  queue: []
};

export default function questionsReducer(
  state: QuestionsState | undefined = DEFAULT_STATE,
  action: ReducerAction
): QuestionsState {
  switch (action.type) {
    case "set-enabled-packs": {
      return {
        ...state,
        enabledCounters: getDistinctCounters(action.enabledPacks).map(
          ({ counterId }) => counterId
        )
      };
    }
    case "start-quiz": {
      const [first, ...rest] = action.questions;
      return {
        asked: [],
        currentQuestion: makeQuestion(first, state.enabledCounters),
        enabledCounters: state.enabledCounters,
        queue: rest
      };
    }
    case "restart-quiz": {
      const [first, ...rest] = action.questions;
      return {
        asked: [],
        currentQuestion: makeQuestion(first, state.enabledCounters),
        enabledCounters: state.enabledCounters,
        queue: rest
      };
    }
    case "replenish-infinite-quiz": {
      let queue: ReadonlyArray<PendingQuestion>;
      if (state.queue.length) {
        queue = [...state.queue, ...action.questions];
      } else {
        queue = action.questions;
      }

      return {
        ...state,
        queue
      };
    }
    case "next-question": {
      const [next, ...rest] = state.queue;
      if (!state.currentQuestion) {
        return state;
      }

      return {
        asked: [...state.asked, state.currentQuestion],
        currentQuestion: makeQuestion(next, state.enabledCounters),
        enabledCounters: state.enabledCounters,
        queue: rest
      };
    }
    case "ignore-last-answer": {
      if (!state.currentQuestion) {
        return state;
      }

      const pending: PendingQuestion = {
        itemId: state.currentQuestion.itemId,
        possibleAmounts: state.currentQuestion.possibleAmounts
      };
      const insertIndex = random(0, state.queue.length - 1);
      const queue = [...state.queue];
      if (insertIndex >= queue.length - 1) {
        queue.push(pending);
      } else {
        queue.splice(insertIndex, 0, pending);
      }

      return {
        ...state,
        queue
      };
    }
    default:
      return state;
  }
}

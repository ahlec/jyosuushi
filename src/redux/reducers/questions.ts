import { memoize, random } from "lodash";
import { COUNTERS_LOOKUP } from "../../../data/counters";
import { ITEMS_LOOKUP } from "../../../data/items";
import { Answer, PendingQuestion, Question } from "../../interfaces";
import { conjugateCounter, getDistinctCounters } from "../../utils";
import {
  ActionIgnoreLastAnswer,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { QuestionsState } from "../index";

const getEnabledCountersSet = memoize(
  (enabledCounters: ReadonlyArray<string>) => new Set<string>(enabledCounters)
);

function makeQuestion(
  { interestRegion, itemId }: PendingQuestion,
  enabledCounters: ReadonlyArray<string>
): Question {
  const amount = random(
    interestRegion.startInclusive,
    interestRegion.endInclusive
  );

  const enabledCountersSet = getEnabledCountersSet(enabledCounters);
  const counters = ITEMS_LOOKUP[itemId].counters
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
    interestRegion,
    itemId,
    validAnswers
  };
}

type ReducerAction =
  | ActionStartQuiz
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
    case "start-quiz": {
      const [first, ...rest] = action.questions;
      const enabledCounters = getDistinctCounters(action.enabledPacks).map(
        ({ counterId }) => counterId
      );
      return {
        asked: [],
        currentQuestion: makeQuestion(first, enabledCounters),
        enabledCounters,
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
    case "next-question": {
      const [next, ...rest] = state.queue;
      return {
        asked: [...state.asked, state.currentQuestion!],
        currentQuestion: makeQuestion(next, state.enabledCounters),
        enabledCounters: state.enabledCounters,
        queue: rest
      };
    }
    case "ignore-last-answer": {
      const pending: PendingQuestion = {
        interestRegion: state.currentQuestion!.interestRegion,
        itemId: state.currentQuestion!.itemId
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

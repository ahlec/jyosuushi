import { random } from "lodash";

import { COUNTERS_LOOKUP } from "@data/counters";
import { ITEMS_LOOKUP } from "@data/items";

import { isNotNull } from "@shared/utils";

import { CounterCollection } from "@jyosuushi/graphql/types.generated";

import { conjugateCounter } from "@jyosuushi/japanese/counters";

import {
  Answer,
  CounterCollectionDescriptor,
  PendingQuestion,
  Question,
} from "@jyosuushi/interfaces";
import { randomFromArray } from "@jyosuushi/utils";

import {
  AmountRange,
  DefinedQuizCounters,
  QuestionsState,
  QuizCounterDefinition,
} from "@jyosuushi/redux";
import {
  ActionIgnoreLastAnswer,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionStartQuiz,
} from "@jyosuushi/redux/actions";
import makeQuiz from "@jyosuushi/ui/modules/quiz/state/QuizMaker";

function makeQuestion(
  { itemId, possibleAmounts }: PendingQuestion,
  enabledCounters: DefinedQuizCounters
): Question {
  const amount = randomFromArray(possibleAmounts);

  const counters = ITEMS_LOOKUP[itemId].counters
    .map(
      ({ counterId }): QuizCounterDefinition | null =>
        enabledCounters[counterId] || null
    )
    .filter(isNotNull);
  const validAnswers: Answer[] = [];

  for (const counter of counters) {
    const answers = conjugateCounter(
      amount,
      COUNTERS_LOOKUP[counter.counterId]
    );
    for (const answer of answers) {
      validAnswers.push({
        collections: counter.collections,
        counterId: counter.counterId,
        countingSystem: answer.countingSystem,
        irregularType: answer.irregularType,
        kana: answer.reading,
        kanji: answer.kanji,
      });
    }
  }

  return {
    amount,
    itemId,
    possibleAmounts,
    validAnswers,
  };
}

function collateDefinedQuizCounters(
  collections: readonly CounterCollection[]
): DefinedQuizCounters {
  const counterIdsToCollections = new Map<
    string,
    CounterCollectionDescriptor[]
  >();

  collections.forEach((collection): void => {
    collection.counterIds.forEach((counterId): void => {
      let entry = counterIdsToCollections.get(counterId);
      if (!entry) {
        entry = [];
        counterIdsToCollections.set(counterId, entry);
      }

      entry.push({
        id: collection.id,
        name: collection.name,
      });
    });
  });

  const result: DefinedQuizCounters = {};
  counterIdsToCollections.forEach((collections, counterId): void => {
    result[counterId] = {
      collections,
      counterId,
    };
  });

  return result;
}

function makeQuizFromDefinedCounters(
  counters: DefinedQuizCounters,
  amountRange: AmountRange
): readonly PendingQuestion[] {
  const countersArray = Object.keys(counters).map(
    (counterId) => COUNTERS_LOOKUP[counterId]
  );
  return makeQuiz(countersArray, amountRange);
}

type ReducerAction =
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionNextQuestion
  | ActionIgnoreLastAnswer;

const DEFAULT_STATE: QuestionsState = {
  asked: [],
  currentQuestion: null,
  queue: [],
  seed: {
    amountRange: AmountRange.Medium,
    enabledCounters: {},
    shouldReplenishOnExhaustion: false,
  },
};

export default function questionsReducer(
  state: QuestionsState = DEFAULT_STATE,
  action: ReducerAction
): QuestionsState {
  switch (action.type) {
    case "start-quiz": {
      const enabledCounters = collateDefinedQuizCounters(action.collections);

      const questions = makeQuizFromDefinedCounters(
        enabledCounters,
        action.amountRange
      );
      const [first, ...rest] = questions;
      return {
        asked: [],
        currentQuestion: makeQuestion(first, enabledCounters),
        queue: rest,
        seed: {
          amountRange: action.amountRange,
          enabledCounters,
          shouldReplenishOnExhaustion: action.mode === "infinite",
        },
      };
    }
    case "restart-quiz": {
      const [first, ...rest] = makeQuizFromDefinedCounters(
        state.seed.enabledCounters,
        state.seed.amountRange
      );

      return {
        asked: [],
        currentQuestion: makeQuestion(first, state.seed.enabledCounters),
        queue: rest,
        seed: state.seed,
      };
    }
    case "next-question": {
      if (!state.currentQuestion) {
        return state;
      }

      let queue: readonly PendingQuestion[];
      if (!state.queue.length && state.seed.shouldReplenishOnExhaustion) {
        queue = makeQuizFromDefinedCounters(
          state.seed.enabledCounters,
          state.seed.amountRange
        );
      } else {
        queue = state.queue;
      }

      const [next, ...rest] = queue;
      return {
        asked: [...state.asked, state.currentQuestion],
        currentQuestion: makeQuestion(next, state.seed.enabledCounters),
        queue: rest,
        seed: state.seed,
      };
    }
    case "ignore-last-answer": {
      if (!state.currentQuestion) {
        return state;
      }

      const pending: PendingQuestion = {
        itemId: state.currentQuestion.itemId,
        possibleAmounts: state.currentQuestion.possibleAmounts,
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
        queue,
      };
    }
    default:
      return state;
  }
}

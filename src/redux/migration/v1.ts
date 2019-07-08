// Changes from Jyosuushi v2.2.0 -> v2.3.0:
//   - Added settings.infiniteMode
//   - Converted `quizState` from a string to an object
//     - The previous value (string) is now a member of object: `state`
//     - Added new value `isInfinite`
//   - PendingQuestion and Question replace InterestRegion with array of numbers
//   - Updated a number of early counters to an appropriate counter ID

import { range } from "lodash";

const CONVERTED_COUNTER_IDS: { [oldCounterId: string]: string } = {
  "days of the month": "日",
  hour: "時",
  "long, thin object": "本",
  minute: "分",
  "people-mei": "名",
  "people-nin": "人"
};

function convertCounterId(counterId: string) {
  return CONVERTED_COUNTER_IDS[counterId] || counterId;
}

function updateQuestionLikeObject(questionLike: any): any {
  const { interestRegion, ...rest } = questionLike;
  return {
    ...rest,
    possibleAmounts: range(
      interestRegion.startInclusive,
      interestRegion.endInclusive + 1
    )
  };
}

function updateCountersState(counters: any): any {
  return Object.keys(counters).reduce((obj: any, counterId: string) => {
    const newCounterId = convertCounterId(counterId);
    obj[newCounterId] = counters[counterId];
    if (newCounterId !== counterId) {
      obj[newCounterId] = {
        ...obj[newCounterId],
        counter: {
          ...obj[newCounterId].counter,
          counterId: newCounterId
        }
      };
    }

    return obj;
  }, {});
}

function updateMissedCounterTallies(tallies: any): any {
  return Object.keys(tallies).reduce((obj: any, counterId: string) => {
    const newCounterId = convertCounterId(counterId);
    obj[newCounterId] = tallies[counterId];
    return obj;
  }, {});
}

export default function migrateV1(state: any): any {
  return {
    ...state,
    counters: updateCountersState(state.counters),
    questions: {
      asked: state.questions.asked.map(updateQuestionLikeObject),
      currentQuestion: state.questions.currentQuestion
        ? updateQuestionLikeObject(state.questions.currentQuestion)
        : null,
      enabledCounters: state.questions.enabledCounters.map(convertCounterId),
      queue: state.questions.queue.map(updateQuestionLikeObject)
    },
    quizState: {
      isInfinite: false,
      state: state.quizState
    },
    scorecard: {
      ...state.scorecard,
      missedCounterTallies: updateMissedCounterTallies(
        state.scorecard.missedCounterTallies
      ),
      mostMissedCounterId: state.scorecard.mostMissedCounterId
        ? convertCounterId(state.scorecard.mostMissedCounterId)
        : null
    },
    settings: {
      ...state.settings,
      infiniteMode: false
    }
  };
}

// Changes from Jyosuushi v2.0.0 -> v2.1.0:
//   - Added settings.amountRange
//   - questions.currentQuestion: number -> {Question}
//   - questions.questions split between questions.asked and questions.queue
//   - Added questions.enabledCounters
// Actions:
//   - Add a default value for settings.amountRange
//   - Remove user from quiz (easiest solution)

import { AmountRange } from "../index";

export default function migrateV0(state: any): any {
  return {
    ...state,
    questions: {
      asked: [],
      currentQuestion: null,
      enabledCounters: [],
      queue: []
    },
    quizState: "not-in-quiz",
    settings: {
      ...state.settings,
      amountRange: AmountRange.Medium
    },
    userAnswers: []
  };
}

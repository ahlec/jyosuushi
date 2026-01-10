import { CounterCollection, CounterFrequency } from "@jyosuushi/interfaces";

import { AmountRange, QuizMode } from "./index";

export interface ActionSetAmountRange {
  type: "set-amount-range";
  amountRange: AmountRange;
}

export function setAmountRange(amountRange: AmountRange): ActionSetAmountRange {
  return {
    amountRange,
    type: "set-amount-range",
  };
}

export interface ActionSetInfiniteMode {
  type: "set-infinite-mode";
  infiniteMode: boolean;
}

export function setInfiniteMode(infiniteMode: boolean): ActionSetInfiniteMode {
  return {
    infiniteMode,
    type: "set-infinite-mode",
  };
}

export interface ActionStartQuiz {
  type: "start-quiz";
  amountRange: AmountRange;
  collections: readonly CounterCollection[];
  mode: QuizMode;
}

export function startQuiz(
  collections: readonly CounterCollection[],
  mode: QuizMode,
  amountRange: AmountRange,
): ActionStartQuiz {
  return {
    amountRange,
    collections,
    mode,
    type: "start-quiz",
  };
}

export interface ActionRestartQuiz {
  type: "restart-quiz";
}

export function restartQuiz(): ActionRestartQuiz {
  return {
    type: "restart-quiz",
  };
}

export interface ActionSubmitCorrectAnswer {
  type: "submit-correct-answer";
  providedAnswer: string;
  readingFrequency: CounterFrequency;
}

export function submitCorrectAnswer(
  providedAnswer: string,
  readingFrequency: CounterFrequency,
): ActionSubmitCorrectAnswer {
  return {
    providedAnswer,
    readingFrequency,
    type: "submit-correct-answer",
  };
}

export interface ActionSubmitIncorrectAnswer {
  type: "submit-incorrect-answer";
  providedAnswer: string;
  possibleCounters: ReadonlyArray<string>;
}

export function submitIncorrectAnswer(
  providedAnswer: string,
  possibleCounters: ReadonlyArray<string>,
): ActionSubmitIncorrectAnswer {
  return {
    possibleCounters,
    providedAnswer,
    type: "submit-incorrect-answer",
  };
}

export interface ActionIgnoreLastAnswer {
  type: "ignore-last-answer";
  possibleCounters: ReadonlyArray<string>;
}

export function ignoreLastAnswer(
  possibleCounters: ReadonlyArray<string>,
): ActionIgnoreLastAnswer {
  return {
    possibleCounters,
    type: "ignore-last-answer",
  };
}

export interface ActionSkipQuestion {
  type: "skip-question";
}

export function skipQuestion(): ActionSkipQuestion {
  return {
    type: "skip-question",
  };
}

export interface ActionNextQuestion {
  type: "next-question";
}

export function nextQuestion(): ActionNextQuestion {
  return {
    type: "next-question",
  };
}

export interface ActionEndQuiz {
  type: "end-quiz";
}

export function endQuiz(): ActionEndQuiz {
  return { type: "end-quiz" };
}

export interface ActionLeaveQuiz {
  type: "leave-quiz";
}

export function leaveQuiz(): ActionLeaveQuiz {
  return {
    type: "leave-quiz",
  };
}

export interface ActionMarkLatestVersion {
  type: "mark-latest-version";
}

export function markLatestVersion(): ActionMarkLatestVersion {
  return {
    type: "mark-latest-version",
  };
}

export type ReduxAction =
  | ActionMarkLatestVersion
  | ActionLeaveQuiz
  | ActionEndQuiz
  | ActionNextQuestion
  | ActionSkipQuestion
  | ActionIgnoreLastAnswer
  | ActionSubmitIncorrectAnswer
  | ActionSubmitCorrectAnswer
  | ActionRestartQuiz
  | ActionStartQuiz
  | ActionSetInfiniteMode
  | ActionSetAmountRange;

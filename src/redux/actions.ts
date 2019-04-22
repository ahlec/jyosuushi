import { StudyPack } from "../data/study-packs";
import { LocalizationLanguage, Question } from "./index";

export interface ActionSetLocalizationLanguage {
  type: "set-localization";
  language: LocalizationLanguage;
}

export interface ActionStartQuiz {
  type: "start-quiz";
  enabledPacks: ReadonlyArray<StudyPack>;
  questions: ReadonlyArray<Question>;
}

export function startQuiz(
  enabledPacks: ReadonlyArray<StudyPack>,
  questions: ReadonlyArray<Question>
): ActionStartQuiz {
  return {
    enabledPacks,
    questions,
    type: "start-quiz"
  };
}

export interface ActionRestartQuiz {
  type: "restart-quiz";
  questions: ReadonlyArray<Question>;
}

export function restartQuiz(
  questions: ReadonlyArray<Question>
): ActionRestartQuiz {
  return {
    questions,
    type: "restart-quiz"
  };
}

export interface ActionSubmitCorrectAnswer {
  type: "submit-correct-answer";
  providedAnswer: string;
}

export function submitCorrectAnswer(
  providedAnswer: string
): ActionSubmitCorrectAnswer {
  return {
    providedAnswer,
    type: "submit-correct-answer"
  };
}

export interface ActionSubmitIncorrectAnswer {
  type: "submit-incorrect-answer";
  providedAnswer: string;
  possibleCounters: ReadonlyArray<string>;
}

export function submitIncorrectAnswer(
  providedAnswer: string,
  possibleCounters: ReadonlyArray<string>
): ActionSubmitIncorrectAnswer {
  return {
    possibleCounters,
    providedAnswer,
    type: "submit-incorrect-answer"
  };
}

export interface ActionIgnoreLastAnswer {
  type: "ignore-last-answer";
  possibleCounters: ReadonlyArray<string>;
}

export function ignoreLastAnswer(
  possibleCounters: ReadonlyArray<string>
): ActionIgnoreLastAnswer {
  return {
    type: "ignore-last-answer",
    possibleCounters
  };
}

export interface ActionSkipQuestion {
  type: "skip-question";
}

export function skipQuestion(): ActionSkipQuestion {
  return {
    type: "skip-question"
  };
}

export interface ActionNextQuestion {
  type: "next-question";
}

export function nextQuestion(): ActionNextQuestion {
  return {
    type: "next-question"
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
    type: "leave-quiz"
  };
}

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

export interface ActionMarkCorrectAnswer {
  type: "mark-correct-answer";
}

export function markCorrectAnswer(): ActionMarkCorrectAnswer {
  return {
    type: "mark-correct-answer"
  };
}

export interface ActionMarkIncorrectAnswer {
  type: "mark-incorrect-answer";
  possibleCounters: ReadonlyArray<string>;
}

export function markIncorrectAnswer(
  possibleCounters: ReadonlyArray<string>
): ActionMarkIncorrectAnswer {
  return {
    type: "mark-incorrect-answer",
    possibleCounters
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

import { StudyPack } from "../data/study-packs";
import { Answer, Item, LocalizationLanguage } from "./index";

export interface ActionSetLocalizationLanguage {
  type: "set-localization";
  language: LocalizationLanguage;
}

export interface ActionCreateQuestion {
  type: "create-question";
  item: Item;
  amount: number;
  validAnswers: ReadonlyArray<Answer>;
}

export interface ActionChangeStudyPacks {
  type: "change-study-packs";
  enabledPacks: ReadonlyArray<StudyPack>;
}

export function changeStudyPacks(
  enabledPacks: ReadonlyArray<StudyPack>
): ActionChangeStudyPacks {
  return {
    enabledPacks,
    type: "change-study-packs"
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

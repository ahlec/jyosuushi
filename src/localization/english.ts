import * as React from "react";

import { StudyPack } from "../data/study-packs";
import { Counter, Item } from "../redux";
import Localization, {
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_FAVICON_CREDIT_LINK,
  VARIABLE_ICON_CREDIT_LINK
} from "./index";

const ENGLISH: Localization = {
  alecDeitloff: "Alec Deitloff",
  andSoForth: "... and so forth",
  buttonIgnoreAnswer: "Ignore Answer",
  buttonNextQuestion: "Next Question",
  counterItemsPrefix: numCounters =>
    `The following ${
      numCounters === 1 ? "is an example" : "are examples"
    } of what this is used to count:`,
  counterName: (counter: Counter) => counter.englishName,
  countersDisplayHeader: (numCounters: number) =>
    `${numCounters} ${numCounters === 1 ? "Counter" : "Counters"} Included`,
  credits: [
    "Application designed and coded by ",
    VARIABLE_ALEC_DEITLOFF,
    ". Vector icons were taken from the ",
    VARIABLE_ICON_CREDIT_LINK,
    " collection. Sakura icon was made by ",
    VARIABLE_FAVICON_CREDIT_LINK,
    "."
  ],
  furtherIrregulars: "There are some more irregulars later on as well though:",
  hereAreTheFirstXNumbers: (amountToDisplay: number) =>
    `Here ${
      amountToDisplay === 1 ? "is" : "are"
    } the first ${amountToDisplay} ${
      amountToDisplay === 1 ? "number" : "numbers"
    }.`,
  irregularsWarning: (
    numIrregulars: number,
    highlightIrregular: (contents: string) => React.ReactNode
  ) => [
    "Make note of the ",
    highlightIrregular(
      `${numIrregulars} irregular ${
        numIrregulars === 1 ? "conjugation" : "conjugations"
      }`
    ),
    "."
  ],
  irregularsWarningNoIrregulars:
    "Luckily, there are no irregular conjugations with this counter!",
  itemPlural: (item: Item) => item.englishPlural,
  itemSingular: (item: Item) => item.englishSingular,
  resultColumnHeaderCounter: "Counter",
  resultColumnHeaderHiragana: "Hiragana",
  resultColumnHeaderKanji: "Kanji",
  resultColumnHeaderRule: "Rule",
  resultColumnHeaderStudyPack: "Study Pack",
  resultCorrectHeader: "Correct!",
  resultIncorrectHeader: "Not quite right...",
  resultSkippedHeader: "Skipped",
  resultTableIntro:
    "Here are all of the possible answers based on the sets you have enabled:",
  resultsTableIrregularLabel: "(irregular)",
  siteTagline: "Let's review Japanese counters!",
  skippedQuestionResult: "Alright! You'll see this question later in the quiz!",
  startQuiz: "Start Quiz!",
  studyPackName: (studyPack: StudyPack) => studyPack.englishName,
  studyPackSelectionHeader: "Study Packs",
  studyPackSelectionSubheader: "(select 1 or more)",
  studyPackSize: (size: number) =>
    size === 1 ? "1 counter" : `${size} counters`,
  tsuNotice:
    "While 〜つ is always a valid counter, you can't use it here. You'll have to be more specific!",
  tutorial: "Tutorial",
  tutorialPage1:
    "On the main screen, find conveniently made packs of counters. Explore each of their details, and then choose the ones that contain the counters you want to study.",
  tutorialPage2:
    "When you hit 'Start Quiz', you'll be prompted with random items of random amounts. Determine the appropriate counter for the item, and then put in your answer.\n\nEven though it's valid, ～つ isn't an accepted answer!",
  tutorialPage3:
    "If you don't want to answer, hit 'Skip this question'. It won't penalize you and will remove the question from the quiz.",
  tutorialPage4:
    "You can then check your accuracy! It will show you all of the correct answers at this stage, so you can take note if you made a mistake.",
  tutorialPage5:
    "If you made a typo or a genuine mistake, hit 'Ignore Answer'. It won't penalize you, and it will shuffle that question in for later to try again. It's up to you to stay honest!",
  tutorialPage6:
    "When you've gone through all of your questions, you'll have a chance to see your overall results. From there, you can choose to change your study packs, or try this quiz again with new numbers and items.",
  xOfYCorrect: (x, y) => `${x} / ${y} correct`
};

export default ENGLISH;

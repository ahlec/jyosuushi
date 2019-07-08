import * as React from "react";

import { Counter, Item, StudyPack } from "../interfaces";
import Localization, {
  VARIABLE_ALEC_DEITLOFF,
  VARIABLE_FAVICON_CREDIT_LINK,
  VARIABLE_ICON_CREDIT_LINK,
  VARIABLE_REPORT_BUG_LINK,
  VARIABLE_SILK_ICONS_CREDIT_LINK,
  VARIABLE_SUBMIT_FEEDBACK_LINK
} from "./index";

const ENGLISH: Localization = {
  alecDeitloff: "Alec Deitloff",
  amountRangeLarge: "Massive",
  amountRangeMedium: "Average",
  amountRangeSmall: "Tiny",
  andSoForth: "... and so forth",
  beta: "Beta",
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
    ". Small icons are part of the ",
    VARIABLE_SILK_ICONS_CREDIT_LINK,
    " collection."
  ],
  feedbackFooter: [
    "Your thoughts are super appreciated! Click here to ",
    VARIABLE_REPORT_BUG_LINK,
    " or ",
    VARIABLE_SUBMIT_FEEDBACK_LINK,
    "."
  ],
  feedbackPageHelpContributeDescription:
    "The project is open source, and if you'd like to join in on working on the project, check out my GitHub!",
  feedbackPageHelpContributeLink: "Help contribute",
  feedbackPageIntro:
    "We're in open beta right now and I hope you enjoy the application! Expect updates frequently!",
  feedbackPageReportBugDescription:
    "Please help me make a more perfect service! A brief description of the problem (or a mistake with Japanese!) will help me track it down and fix it right away!",
  feedbackPageReportBugLink: "Report a bug",
  feedbackPageSubmitFeedbackDescription:
    "Share with me anything that you'd like to see happen, or any ideas on how I can improve this service!",
  feedbackPageSubmitFeedbackLink: "Submit feedback and ideas",
  furtherIrregulars: "There are some more irregulars later on as well though:",
  hereAreTheFirstXNumbers: (amountToDisplay: number) =>
    `Here ${
      amountToDisplay === 1 ? "is" : "are"
    } the first ${amountToDisplay} ${
      amountToDisplay === 1 ? "number" : "numbers"
    }.`,
  highScoreEncouragements: [
    "That was astounding, really.",
    "Look at how far you've come on your journey!",
    "This stuff isn't easy, and you're aceing it!",
    "It's taken a lot of work to get here; pat yourself on the back."
  ],
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
  lowScoreEncouragements: [
    "You're trying your best, and that's the key to success!",
    "You've learned so much to get here, I know you'll get to where you want to go!",
    "This stuff isn't easy; practice WILL make perfect."
  ],
  pageExplore: "Explore",
  pageExploreCounter: "Counter:",
  pageExploreStudyPack: "Study Pack:",
  pageFeedback: "Feedback",
  pagePrepare: "Prepare",
  pageReleaseNotes: "Release Notes",
  pageSettings: "Settings",
  reportABug: "Report a Bug",
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
  resultTableIrregularLabel: "(irregular)",
  resultTableStrangeLabel: "(strange)",
  settingAmountRange: "Amounts Range",
  settingAmountRangeDescription: "Adjust the range of the numbers generated.",
  settingInfiniteMode: "Infinite Mode",
  settingInfiniteModeDescription:
    "Decide whether the quiz has a finite number of questions, or if it goes on forever.",
  siteTagline: "Let's review Japanese counters!",
  skippedQuestionResult:
    "Alright! You don't need to worry about this question!",
  startQuiz: "Start Quiz!",
  studyPackName: (studyPack: StudyPack) => studyPack.englishName,
  studyPackSelectionHeader: "Study Packs",
  studyPackSelectionSubheader: "(select 1 or more)",
  studyPackSize: (size: number) =>
    size === 1 ? "1 counter" : `${size} counters`,
  submitFeedback: "Submit Feedback",
  submittedLabel: "Submitted:",
  tsuNotice:
    "While 〜つ and 〜個 are always valid counters, you can't use them here. You'll have to be more specific!",
  tutorial: "Tutorial",
  tutorialPage1:
    "On the main screen, find conveniently made packs of counters. Explore each of their details, and then choose the ones that contain the counters you want to study.",
  tutorialPage2:
    "When you hit 'Start Quiz', you'll be prompted with random nouns of random amounts. Determine the appropriate counter for the noun, and then put in your answer.\n\nEven though they're valid, 〜つ and 〜個 aren't accepted answers!",
  tutorialPage3:
    "If you don't want to answer, hit 'Skip this question'. It won't penalize you and will remove the question from the quiz.",
  tutorialPage4:
    "Once you submit your answer, check your accuracy! It will show you all of the correct answers at this stage, so you can take note if you made a mistake.",
  tutorialPage5:
    "If you made a typo or a genuine mistake, hit 'Ignore Answer'. It won't penalize you, and it will shuffle that question in for later to try again. It's up to you to stay honest!",
  tutorialPage6:
    "When you've gone through all of your questions, you'll have a chance to see your overall results. From there, you can choose to change your study packs, or try this quiz again with new numbers and items.",
  xOfYCorrect: (x, y) => `${x} / ${y} correct`
};

export default ENGLISH;

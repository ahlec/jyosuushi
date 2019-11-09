import * as React from "react";

import { Counter, Item, StudyPack } from "@jyosuushi/interfaces";

export const VARIABLE_ALEC_DEITLOFF = 17;
export const VARIABLE_ICON_CREDIT_LINK = 18;
export const VARIABLE_FAVICON_CREDIT_LINK = 19;
export const VARIABLE_SILK_ICONS_CREDIT_LINK = 20;
export const VARIABLE_REPORT_BUG_LINK = 21;
export const VARIABLE_SUBMIT_FEEDBACK_LINK = 22;

export type CreditsPiece =
  | string
  | typeof VARIABLE_ALEC_DEITLOFF
  | typeof VARIABLE_ICON_CREDIT_LINK
  | typeof VARIABLE_FAVICON_CREDIT_LINK
  | typeof VARIABLE_SILK_ICONS_CREDIT_LINK;

export type FeedbackFooterPiece =
  | string
  | typeof VARIABLE_REPORT_BUG_LINK
  | typeof VARIABLE_SUBMIT_FEEDBACK_LINK;

export default interface Localization {
  alecDeitloff: string;
  amountRangeSmall: string;
  amountRangeMedium: string;
  amountRangeLarge: string;
  amountRangeGiant: string;
  andSoForth: string;
  beta: string;
  buttonIgnoreAnswer: string;
  buttonNextQuestion: string;
  counterItemsPrefix: (numCounters: number) => string;
  counterName: (counter: Counter) => string;
  counterPageHeaderConjugation: string;
  counterPageHeaderDisambiguation: string;
  counterPageHeaderInfo: string;
  counterPageHeaderItems: string;
  countersDisplayHeader: (numCounters: number) => string;
  credits: ReadonlyArray<CreditsPiece>;
  customCounterAmountInputPrefix: string;
  externalLinksHeader: string;
  feedbackFooter: ReadonlyArray<FeedbackFooterPiece>;
  feedbackPageHelpContributeDescription: string;
  feedbackPageHelpContributeLink: string;
  feedbackPageIntro: string;
  feedbackPageReportBugDescription: string;
  feedbackPageReportBugLink: string;
  feedbackPageSubmitFeedbackDescription: string;
  feedbackPageSubmitFeedbackLink: string;
  furtherIrregulars: string;
  furtherReading: string;
  hereAreTheFirstXNumbers: (amountToDisplay: number) => string;
  highScoreEncouragements: ReadonlyArray<string>;
  irregularsWarning: (
    numIrregulars: number,
    highlightIrregular: (contents: string) => React.ReactNode
  ) => React.ReactNode[];
  irregularsWarningNoIrregulars: string;
  itemPlural: (item: Item) => string;
  itemSingular: (item: Item) => string;
  lowScoreEncouragements: ReadonlyArray<string>;
  pagePrepare: string;
  pageExplore: string;
  pageExploreCounter: string;
  pageExploreStudyPack: string;
  pageReleaseNotes: string;
  pageSettings: string;
  pageFeedback: string;
  reportABug: string;
  resultColumnHeaderCounter: string;
  resultColumnHeaderRule: string;
  resultColumnHeaderStudyPack: string;
  resultColumnHeaderKanji: string;
  resultColumnHeaderHiragana: string;
  resultCorrectHeader: string;
  resultIncorrectHeader: string;
  resultSkippedHeader: string;
  resultTableIntro: string;
  resultTableIrregularLabel: string;
  resultTableStrangeLabel: string;
  settingAmountRange: string;
  settingAmountRangeDescription: string;
  settingInfiniteMode: string;
  settingInfiniteModeDescription: string;
  siteTagline: string;
  skippedQuestionResult: string;
  startQuiz: string;
  studyPackName: (studyPack: StudyPack) => string;
  studyPackSelectionHeader: string;
  studyPackSelectionSubheader: string;
  studyPackSize: (size: number) => string;
  submitFeedback: string;
  submittedLabel: string;
  tsuNotice: string;
  tutorial: string;
  tutorialPage1: string;
  tutorialPage2: string;
  tutorialPage3: string;
  tutorialPage4: string;
  tutorialPage5: string;
  tutorialPage6: string;
  xOfYCorrect: (x: number, y: number) => string;
}

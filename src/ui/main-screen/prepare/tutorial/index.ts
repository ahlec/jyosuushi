import Localization from "@jyosuushi/localization";

import IgnoreAnswerPng from "./ignore-answer.png";
import QuizWrapupPng from "./quiz-wrapup.png";
import ReviewAnswersPng from "./review-answers.png";
import SkipQuestionsPng from "./skip-questions.png";
import StudyPacksPng from "./study-packs.png";
import SubmitAnswerPng from "./submit-answer.png";

export interface TutorialPage {
  getText: (localization: Localization) => string;
  image: string;
}

export const TUTORIAL_PAGES: ReadonlyArray<TutorialPage> = [
  {
    getText: (localization): string => localization.tutorialPage1,
    image: StudyPacksPng
  },
  {
    getText: (localization): string => localization.tutorialPage2,
    image: SubmitAnswerPng
  },
  {
    getText: (localization): string => localization.tutorialPage3,
    image: SkipQuestionsPng
  },
  {
    getText: (localization): string => localization.tutorialPage4,
    image: ReviewAnswersPng
  },
  {
    getText: (localization): string => localization.tutorialPage5,
    image: IgnoreAnswerPng
  },
  {
    getText: (localization): string => localization.tutorialPage6,
    image: QuizWrapupPng
  }
];

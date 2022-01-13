import { defineMessages, MessageDescriptor } from "react-intl";

import IgnoreAnswerPng from "./ignore-answer.png";
import QuizWrapupPng from "./quiz-wrapup.png";
import ReviewAnswersPng from "./review-answers.png";
import SkipQuestionsPng from "./skip-questions.png";
import StudyPacksPng from "./study-packs.png";
import SubmitAnswerPng from "./submit-answer.png";

export interface TutorialPage {
  image: string;
  text: MessageDescriptor;
}

const INTL_MESSAGES = defineMessages({
  page1: {
    defaultMessage:
      "On the main screen, find conveniently made packs of counters. Explore each of their details, and then choose the ones that contain the counters you want to study.",
    id: "mainScreen.tutorial.page1",
  },
  page2: {
    defaultMessage:
      "When you hit 'Start Quiz', you'll be prompted with random nouns of random amounts. Determine the appropriate counter for the noun, and then put in your answer.\n\nEven though they're valid, 〜つ and 〜個 aren't accepted answers!",
    id: "mainScreen.tutorial.page2",
  },
  page3: {
    defaultMessage:
      "If you don't want to answer, hit 'Skip this question'. It won't penalize you and will remove the question from the quiz.",
    id: "mainScreen.tutorial.page3",
  },
  page4: {
    defaultMessage:
      "Once you submit your answer, check your accuracy! It will show you all of the correct answers at this stage, so you can take note if you made a mistake.",
    id: "mainScreen.tutorial.page4",
  },
  page5: {
    defaultMessage:
      "If you made a typo or a genuine mistake, hit 'Ignore Answer'. It won't penalize you, and it will shuffle that question in for later to try again. It's up to you to stay honest!",
    id: "mainScreen.tutorial.page5",
  },
  page6: {
    defaultMessage:
      "When you've gone through all of your questions, you'll have a chance to see your overall results. From there, you can choose to change your study packs, or try this quiz again with new numbers and items.",
    id: "mainScreen.tutorial.page6",
  },
});

export const TUTORIAL_PAGES: ReadonlyArray<TutorialPage> = [
  {
    image: StudyPacksPng,
    text: INTL_MESSAGES.page1,
  },
  {
    image: SubmitAnswerPng,
    text: INTL_MESSAGES.page2,
  },
  {
    image: SkipQuestionsPng,
    text: INTL_MESSAGES.page3,
  },
  {
    image: ReviewAnswersPng,
    text: INTL_MESSAGES.page4,
  },
  {
    image: IgnoreAnswerPng,
    text: INTL_MESSAGES.page5,
  },
  {
    image: QuizWrapupPng,
    text: INTL_MESSAGES.page6,
  },
];

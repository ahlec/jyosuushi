import { random } from "lodash";
import {
  ActionIgnoreLastAnswer,
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { QuestionsState } from "../index";

type ReducerAction =
  | ActionStartQuiz
  | ActionRestartQuiz
  | ActionNextQuestion
  | ActionIgnoreLastAnswer;

const DEFAULT_STATE: QuestionsState = {
  currentQuestion: 0,
  questions: []
};

export default function questionsReducer(
  state: QuestionsState | undefined = DEFAULT_STATE,
  action: ReducerAction
): QuestionsState {
  switch (action.type) {
    case "start-quiz":
    case "restart-quiz":
      return {
        currentQuestion: 0,
        questions: action.questions
      };
    case "next-question":
      return {
        currentQuestion: state.currentQuestion + 1,
        questions: state.questions
      };
    case "ignore-last-answer": {
      const question = state.questions[state.currentQuestion];
      const randomIndex = random(
        state.currentQuestion + 1,
        state.questions.length - 1
      );
      const nextQuestions = [...state.questions];
      if (randomIndex >= nextQuestions.length - 1) {
        nextQuestions.push(question);
      } else {
        nextQuestions.splice(randomIndex, 0, question);
      }

      return {
        currentQuestion: state.currentQuestion,
        questions: nextQuestions
      };
    }
    default:
      return state;
  }
}

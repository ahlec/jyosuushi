import {
  ActionNextQuestion,
  ActionRestartQuiz,
  ActionStartQuiz
} from "../actions";
import { QuestionsState } from "../index";

type ReducerAction = ActionStartQuiz | ActionRestartQuiz | ActionNextQuestion;

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
    default:
      return state;
  }
}

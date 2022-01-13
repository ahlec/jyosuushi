import { QuizMode, State } from "./index";

export function getIsQuizActive(state: State): boolean {
  return state.quizState.state !== "not-in-quiz";
}

export function getCurrentQuizMode(state: State): QuizMode {
  if (state.settings.infiniteMode) {
    return "infinite";
  }

  return "regular";
}

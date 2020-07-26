import { State } from "./index";

export function getIsQuizActive(state: State): boolean {
  return state.quizState.state !== "not-in-quiz";
}

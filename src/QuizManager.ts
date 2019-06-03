import { STUDY_PACK_LOOKUP } from "../data/studyPacks";
import makeQuiz from "./QuizMaker";
import { StudyPack } from "./redux";
import { endQuiz, nextQuestion, restartQuiz, startQuiz } from "./redux/actions";
import { Store } from "./redux/store";

export default class QuizManager {
  public constructor(private readonly store: Store) {}

  public get hasNextQuestion(): boolean {
    const state = this.store.getState();
    return (
      state.questions.currentQuestion < state.questions.questions.length - 1
    );
  }

  public startNewQuiz(studyPacks: ReadonlyArray<StudyPack>) {
    if (!studyPacks.length) {
      throw new Error("Must provide one or more study packs");
    }

    const questions = makeQuiz(studyPacks);
    this.store.dispatch(startQuiz(studyPacks, questions));
  }

  public endQuiz() {
    this.store.dispatch(endQuiz());
  }

  public restart() {
    const state = this.store.getState();
    const packs = state.enabledPacks.map(packId => STUDY_PACK_LOOKUP[packId]);
    const questions = makeQuiz(packs);
    this.store.dispatch(restartQuiz(questions));
  }

  public nextQuestion() {
    if (!this.hasNextQuestion) {
      throw new Error("No more questions in this quiz");
    }

    this.store.dispatch(nextQuestion());
  }
}

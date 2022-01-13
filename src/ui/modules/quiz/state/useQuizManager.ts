import { useContext } from "react";

import QuizManagerContext from "./context";
import QuizManager from "./QuizManager";

function useQuizManager(): QuizManager {
  const current = useContext(QuizManagerContext);
  if (!current) {
    throw new Error("QuizManager context must be provided here!");
  }

  return current;
}

export default useQuizManager;

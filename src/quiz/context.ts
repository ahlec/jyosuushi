import { createContext } from "react";
import QuizManager from "./QuizManager";

const QuizManagerContext = createContext<QuizManager | undefined>(undefined);
export default QuizManagerContext;

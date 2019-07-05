import { createContext } from "react";
import QuizManager from "./QuizManager";

const QuizManagerContext = createContext<QuizManager>(undefined as any);
export default QuizManagerContext;

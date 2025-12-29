import { usePostHog } from "posthog-js/react";
import React, { createContext, useContext, useMemo } from "react";
import { Store } from "@jyosuushi/redux/store";
import QuizManager from "./QuizManager";

const QuizManagerContext = createContext<QuizManager | undefined>(undefined);

export function useQuizManager(): QuizManager {
  const quizManager = useContext(QuizManagerContext);
  if (!quizManager) {
    throw new Error(
      "Fatal error -- not within the global QuizManager React context",
    );
  }

  return quizManager;
}

type Props = {
  children: React.ReactNode;
  reduxStore: Store;
};

export function QuizManagerProvider({
  children,
  reduxStore,
}: Props): React.ReactElement {
  const posthog = usePostHog();

  const value = useMemo(
    (): QuizManager => new QuizManager(reduxStore, posthog),
    [reduxStore, posthog],
  );

  return (
    <QuizManagerContext.Provider value={value}>
      {children}
    </QuizManagerContext.Provider>
  );
}

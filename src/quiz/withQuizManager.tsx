import * as React from "react";

import QuizManagerContext from "./context";
import QuizManager from "./QuizManager";

export interface InjectedProps {
  quizManager: QuizManager;
}

export default function withQuizManager<TComponentProps>(
  Component: React.ComponentClass<TComponentProps & InjectedProps>
): React.ComponentClass<TComponentProps> {
  return class WithQuizManager extends React.PureComponent<TComponentProps> {
    public render() {
      return (
        <QuizManagerContext.Consumer>
          {quizManager => (
            <Component {...this.props} quizManager={quizManager} />
          )}
        </QuizManagerContext.Consumer>
      );
    }
  };
}

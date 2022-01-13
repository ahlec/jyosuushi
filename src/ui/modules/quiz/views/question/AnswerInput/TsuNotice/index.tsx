import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { State } from "@jyosuushi/redux";

import TsuWarningModel, { NUM_DEFAULT_WARNINGS } from "./model";

import styles from "./index.scss";

interface ReduxProps {
  numQuestionsAsked: number;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    numQuestionsAsked: state.user.numQuestionsAsked,
  };
}

type ComponentProps = ReduxProps;

const INTL_MESSAGES = defineMessages({
  text: {
    defaultMessage:
      "While 〜つ and 〜個 are always valid counters, you can't use them here. You'll have to be more specific!",
    id: "quiz-page.AnswerInput.TsuNotice.text",
  },
});

class TsuNotice extends React.PureComponent<ComponentProps> {
  private readonly model: TsuWarningModel;

  public constructor(props: ComponentProps) {
    super(props);
    this.model = TsuWarningModel.get();
  }

  public componentDidUpdate({
    numQuestionsAsked: prevNumQuestionsAsked,
  }: ComponentProps): void {
    const { numQuestionsAsked } = this.props;
    if (numQuestionsAsked > prevNumQuestionsAsked) {
      this.model.reduce();
      this.forceUpdate();
    }
  }

  public render(): React.ReactNode {
    if (this.model.numWarnings <= 0) {
      return null;
    }

    return (
      <FormattedMessage {...INTL_MESSAGES.text}>
        {(text) => (
          <div
            className={styles.tsuNotice}
            style={{
              opacity: this.model.numWarnings / NUM_DEFAULT_WARNINGS,
            }}
          >
            {text}
          </div>
        )}
      </FormattedMessage>
    );
  }
}

export default connect(mapStateToProps)(TsuNotice);

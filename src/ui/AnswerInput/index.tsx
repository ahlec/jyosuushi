import * as React from "react";
import { connect } from "react-redux";

import { Hiragana } from "../../japanese/kana";
import { Question, State } from "../../redux";
import KanaInput from "./KanaInput";

import "./index.scss";

const KEY_ENTER = 13;

interface ComponentProps {
  currentQuestion: Question;
}

interface ComponentState {
  value: string;
  isValid: boolean;
}

function mapStateToProps(state: State): ComponentProps {
  return {
    currentQuestion: state.currentQuestion!
  };
}

class AnswerInput extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    isValid: false,
    value: ""
  };

  public render() {
    return (
      <div className="AnswerInput" onKeyDown={this.onKeyDown}>
        <KanaInput kana={Hiragana} onChange={this.onChange} />
      </div>
    );
  }

  private onChange = (value: string) => {
    this.setState({
      isValid: !!value && Hiragana.isOnlyKana(value),
      value
    });
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === KEY_ENTER) {
      this.submit();
    }
  };

  private submit() {
    console.log("attempting submit of", this.state.value);
  }
}

export default connect(mapStateToProps)(AnswerInput);

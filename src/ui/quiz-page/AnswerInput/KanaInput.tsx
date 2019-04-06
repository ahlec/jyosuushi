import * as React from "react";

import { KanaDefinition } from "../../../japanese/kana";
import { Question } from "../../../redux";

interface ComponentProps {
  children?: React.ReactNode;
  currentQuestion: Question;
  enabled: boolean;
  kana: KanaDefinition;
  onChange?: (value: string) => void;
}

interface ComponentState {
  buffer: string;
  lastPosition: number;
  rawValue: string;
}

function getResetBufferForKana(kana: string): string {
  // In cases where we have a completion like "nw" that would
  // produce "んw" we want to make sure that we start the buffer
  // with the "w" in order to be able to handle situations like
  // "んわ".

  switch (kana[0]) {
    case "ん":
    case "ン":
    case "っ":
    case "ッ": {
      return kana[1] || "";
    }
    default: {
      return "";
    }
  }
}

export default class KanaInput extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    buffer: "",
    lastPosition: 0,
    rawValue: ""
  };
  private inputRef = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    const { enabled } = this.props;
    const { current: input } = this.inputRef;

    if (enabled && input) {
      input.focus();
    }
  }

  public componentDidUpdate({
    currentQuestion: prevQuestion,
    enabled: wasEnabled
  }: ComponentProps) {
    const { currentQuestion, enabled } = this.props;
    if (currentQuestion !== prevQuestion) {
      this.reset();
    }

    if (enabled !== wasEnabled) {
      const { current: input } = this.inputRef;
      if (input) {
        input.focus();
      }
    }
  }

  public render() {
    const { children, enabled } = this.props;
    const { rawValue } = this.state;
    return (
      <div className="KanaInput">
        <input
          ref={this.inputRef}
          type="text"
          disabled={!enabled}
          value={rawValue}
          onChange={this.handleChange}
        />
        {children}
      </div>
    );
  }

  private setCursor(position: number) {
    const { current: input } = this.inputRef;
    if (!input) {
      return;
    }

    input.selectionEnd = position;
    input.selectionStart = position;

    // TODO: This doesn't work in a react world?
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { kana, onChange } = this.props;
    const currentPosition = event.target.selectionStart || 0;
    let buffer = this.applyChangeEventToBuffer(event, currentPosition);

    let lastPosition = currentPosition;
    let temp = buffer;
    let rawValue = event.target.value;
    while (temp) {
      const converted = kana.conversionChart[temp];
      if (converted) {
        rawValue =
          rawValue.slice(0, currentPosition - temp.length) +
          converted +
          rawValue.slice(currentPosition);

        const newPosition = currentPosition - temp.length + converted.length;
        lastPosition = newPosition;
        this.setCursor(newPosition);

        buffer = getResetBufferForKana(converted);
        break;
      }

      temp = temp.slice(1);
    }

    this.setState({ buffer, lastPosition, rawValue });
    if (onChange) {
      onChange(rawValue);
    }
  };

  private applyChangeEventToBuffer(
    event: React.ChangeEvent<HTMLInputElement>,
    currentPosition: number
  ): string {
    const positionDelta = currentPosition - this.state.lastPosition;

    const newCharacter = event.target.value[currentPosition - 1] || "";
    if (positionDelta === 1) {
      return this.state.buffer + newCharacter;
    }

    if (positionDelta < 0) {
      // prev: orimaru
      // new: orime
      // buffer: 'e'

      // prev: orimaru
      // new: orim
      // buffer: ''

      // prev: orimaru
      // new: orvald
      // buffer: 'vald'

      const prevValue = this.state.rawValue;
      const newValue = event.target.value;
      for (let index = 0; index < newValue.length; ++index) {
        if (index >= prevValue.length) {
          break;
        }

        if (prevValue[index] !== newValue[index]) {
          return newValue.slice(index);
        }
      }

      return "";
    }

    return newCharacter;
  }

  private reset() {
    const { onChange } = this.props;
    this.setState({
      buffer: "",
      lastPosition: 0,
      rawValue: ""
    });
    if (onChange) {
      onChange("");
    }
  }
}

import * as React from "react";

import { KanaDefinition } from "@jyosuushi/japanese/kana";

export interface KanaInputValue {
  conversionBuffer: string;
  lastPosition: number;
  rawValue: string;
  validValue: string | null;
}

interface ComponentProps {
  children?: React.ReactNode;
  enabled: boolean;
  kana: KanaDefinition;
  onChange?: (value: KanaInputValue) => void;
  value: KanaInputValue | null | undefined;
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

export default class KanaInput extends React.PureComponent<ComponentProps> {
  private inputRef = React.createRef<HTMLInputElement>();

  public componentDidMount(): void {
    const { enabled } = this.props;
    const { current: input } = this.inputRef;

    if (enabled && input) {
      input.focus();
    }
  }

  public componentDidUpdate({ enabled: wasEnabled }: ComponentProps): void {
    const { enabled } = this.props;
    if (enabled !== wasEnabled) {
      const { current: input } = this.inputRef;
      if (input) {
        if (enabled) {
          input.focus();
        } else {
          input.blur();
        }
      }
    }
  }

  public render(): React.ReactNode {
    const { children, enabled, value } = this.props;
    return (
      <div className="KanaInput">
        <input
          ref={this.inputRef}
          type="text"
          disabled={!enabled}
          value={value ? value.rawValue : ""}
          onChange={this.handleChange}
        />
        {children}
      </div>
    );
  }

  private setCursor(position: number): void {
    const { current: input } = this.inputRef;
    if (!input) {
      return;
    }

    input.selectionEnd = position;
    input.selectionStart = position;

    // TODO: This doesn't work in a react world?
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

    if (onChange) {
      let isValid = !!rawValue && kana.isOnlyKana(rawValue);
      let validValue: string | null = rawValue;
      if (!isValid && rawValue && rawValue.toLowerCase().endsWith("n")) {
        // Check to see if we end with "n" like "じｎ"
        // If we hit enter with that, then we know that's still valid
        if (rawValue.length === 1) {
          // The input is just "n"
          isValid = true;
          validValue = "ん";
        } else {
          const withoutUnconvertedFinalN = rawValue.substr(
            0,
            rawValue.length - 1
          );
          validValue = withoutUnconvertedFinalN + "ん";
          isValid = kana.isOnlyKana(withoutUnconvertedFinalN);
        }
      }

      onChange({
        conversionBuffer: buffer,
        lastPosition,
        rawValue,
        validValue: isValid ? validValue : null
      });
    }
  };

  private applyChangeEventToBuffer(
    event: React.ChangeEvent<HTMLInputElement>,
    currentPosition: number
  ): string {
    const { conversionBuffer, lastPosition, rawValue } = this.props.value
      ? this.props.value
      : { conversionBuffer: "", lastPosition: 0, rawValue: "" };
    const positionDelta = currentPosition - lastPosition;

    const newCharacter = event.target.value[currentPosition - 1] || "";
    if (positionDelta === 1) {
      return conversionBuffer + newCharacter;
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

      const newValue = event.target.value;
      for (let index = 0; index < newValue.length; ++index) {
        if (index >= rawValue.length) {
          break;
        }

        if (rawValue[index] !== newValue[index]) {
          return newValue.slice(index);
        }
      }

      return "";
    }

    return newCharacter;
  }
}

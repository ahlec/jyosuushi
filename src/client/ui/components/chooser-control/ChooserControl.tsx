import { noop } from "lodash";
import * as React from "react";

import ChoiceElement from "./ChoiceElement";
import { Choice } from "./types";

export { Choice };

import "./ChooserControl.scss";

interface ComponentProps<TValue> {
  choices: ReadonlyArray<Choice<TValue>>;
  currentValue: TValue;
  onChoiceClicked: (value: TValue) => void;
}

function ChooserControl<TValue>({
  choices,
  currentValue,
  onChoiceClicked,
}: ComponentProps<TValue>): React.ReactElement {
  // Render component
  return (
    <div className="ChooserControl">
      {choices.map(
        (choice: Choice<TValue>): React.ReactNode => {
          const isSelected = choice.value === currentValue;
          return (
            <ChoiceElement
              key={choice.title}
              choice={choice}
              isSelected={isSelected}
              onSelected={
                isSelected ? noop : (): void => onChoiceClicked(choice.value)
              }
            />
          );
        }
      )}
    </div>
  );
}

export default ChooserControl;

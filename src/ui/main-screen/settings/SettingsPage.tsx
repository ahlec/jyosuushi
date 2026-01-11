import React, { useCallback } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import { AmountRange, State } from "@jyosuushi/redux";
import {
  setAmountRange,
  setFailOnUncommonReadings,
  setInfiniteMode,
} from "@jyosuushi/redux/actions";
import { useDispatch } from "@jyosuushi/redux/useDispatch";

import Checkbox from "@jyosuushi/ui/components/Checkbox";
import ChooserControl, {
  Choice,
} from "@jyosuushi/ui/components/chooser-control/ChooserControl";

import { AMOUNT_RANGES } from "@jyosuushi/constants";

import Setting from "./Setting";
import * as styles from "./SettingsPage.scss";

const INTL_MESSAGES = defineMessages({
  amountRangeChoiceRange: {
    defaultMessage: "{min}-{max}",
    id: "settings.quiz.amountRange.choiceRange",
  },
  amountRangeDescription: {
    defaultMessage: "Adjust the range of numbers generated.",
    id: "settings.quiz.amountRange.description",
  },
  amountRangeHeader: {
    defaultMessage: "Amounts Range",
    id: "settings.quiz.amountRange.header",
  },
  failOnUncommonCheckboxLabel: {
    defaultMessage: "Fail uncommon answers",
    id: "settings.quiz.failOnUncommonReadings.checkboxLabel",
  },
  failOnUncommonDescription: {
    defaultMessage:
      "When using an uncommon reading for a counter during a quiz, this will always be called out. Additionally, you can choose whether to fail these answers.",
    id: "settings.quiz.failOnUncommonReadings.description",
  },
  failOnUncommonHeader: {
    defaultMessage: "Fail on Uncommon Readings",
    id: "settings.quiz.failOnUncommonReadings.header",
  },
  infiniteModeCheckboxLabel: {
    defaultMessage: "Infinite Mode",
    id: "settings.quiz.infiniteMode.checkboxLabel",
  },
  infiniteModeDescription: {
    defaultMessage:
      "Choose whether the quiz has a finite number of questions, or if it goes on forever.",
    id: "settings.quiz.infiniteMode.description",
  },
  infiniteModeHeader: {
    defaultMessage: "Infinite Mode",
    id: "settings.quiz.infiniteMode.header",
  },
  pageHeader: {
    defaultMessage: "Settings",
    id: "settings.pageHeader",
  },
});

const AMOUNT_RANGE_CHOICES: ReadonlyArray<Choice<AmountRange>> = [
  {
    id: "small",
    subtext: {
      descriptor: INTL_MESSAGES.amountRangeChoiceRange,
      values: {
        max: AMOUNT_RANGES[AmountRange.Small].max,
        min: AMOUNT_RANGES[AmountRange.Small].min,
      },
    },
    title: {
      descriptor: AMOUNT_RANGES[AmountRange.Small].name,
    },
    value: AmountRange.Small,
  },
  {
    id: "medium",
    subtext: {
      descriptor: INTL_MESSAGES.amountRangeChoiceRange,
      values: {
        max: AMOUNT_RANGES[AmountRange.Medium].max,
        min: AMOUNT_RANGES[AmountRange.Medium].min,
      },
    },
    title: {
      descriptor: AMOUNT_RANGES[AmountRange.Medium].name,
    },
    value: AmountRange.Medium,
  },
  {
    id: "large",
    subtext: {
      descriptor: INTL_MESSAGES.amountRangeChoiceRange,
      values: {
        max: AMOUNT_RANGES[AmountRange.Large].max,
        min: AMOUNT_RANGES[AmountRange.Large].min,
      },
    },
    title: {
      descriptor: AMOUNT_RANGES[AmountRange.Large].name,
    },
    value: AmountRange.Large,
  },
  {
    id: "giant",
    subtext: {
      descriptor: INTL_MESSAGES.amountRangeChoiceRange,
      values: {
        max: AMOUNT_RANGES[AmountRange.Giant].max,
        min: AMOUNT_RANGES[AmountRange.Giant].min,
      },
    },
    title: {
      descriptor: AMOUNT_RANGES[AmountRange.Giant].name,
    },
    value: AmountRange.Giant,
  },
];

function SettingsPage(): React.ReactElement {
  // Connect with the rest of the app
  const dispatch = useDispatch();

  // Retrieve the current user settings
  const currentInfiniteMode = useSelector(
    (state: State): boolean => state.settings.infiniteMode,
  );
  const currentRange = useSelector(
    (state: State): AmountRange => state.settings.amountRange,
  );
  const failOnUncommonReadings = useSelector(
    (state: State) => state.settings.failOnUncommonReadings,
  );

  // Handle events
  const handleCurrentRangeChanged = useCallback(
    (amountRange: AmountRange): void => {
      dispatch(setAmountRange(amountRange));
    },
    [dispatch],
  );

  const handleInfiniteModeChanged = useCallback(
    (infiniteMode: boolean): void => {
      dispatch(setInfiniteMode(infiniteMode));
    },
    [dispatch],
  );

  const handleFailOnUncommonChanged = useCallback(
    (next: boolean): void => {
      dispatch(setFailOnUncommonReadings(next));
    },
    [dispatch],
  );

  // Render the component
  return (
    <div className={styles.settingsPage}>
      <FormattedMessage {...INTL_MESSAGES.pageHeader} tagName="h1" />
      <div className={styles.settings}>
        <Setting
          header={INTL_MESSAGES.amountRangeHeader}
          description={INTL_MESSAGES.amountRangeDescription}
        >
          <ChooserControl
            currentValue={currentRange}
            onChoiceClicked={handleCurrentRangeChanged}
            choices={AMOUNT_RANGE_CHOICES}
          />
        </Setting>
        <Setting
          header={INTL_MESSAGES.infiniteModeHeader}
          description={INTL_MESSAGES.infiniteModeDescription}
        >
          <Checkbox
            checked={currentInfiniteMode}
            label={INTL_MESSAGES.infiniteModeCheckboxLabel}
            onChange={handleInfiniteModeChanged}
          />
        </Setting>
        <Setting
          header={INTL_MESSAGES.failOnUncommonHeader}
          description={INTL_MESSAGES.failOnUncommonDescription}
        >
          <Checkbox
            checked={failOnUncommonReadings}
            label={INTL_MESSAGES.failOnUncommonCheckboxLabel}
            onChange={handleFailOnUncommonChanged}
          />
        </Setting>
      </div>
    </div>
  );
}

export default SettingsPage;

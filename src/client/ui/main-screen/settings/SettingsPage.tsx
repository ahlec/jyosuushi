import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { AmountRange, State } from "@jyosuushi/redux";
import { setAmountRange, setInfiniteMode } from "@jyosuushi/redux/actions";
import { Dispatch } from "@jyosuushi/redux/store";

import Checkbox from "@jyosuushi/ui/components/Checkbox";
import ChooserControl, {
  Choice,
} from "@jyosuushi/ui/components/chooser-control/ChooserControl";

import { AMOUNT_RANGES } from "@jyosuushi/constants";

import Setting from "./Setting";
import styles from "./SettingsPage.scss";

interface ReduxProps {
  currentInfiniteMode: boolean;
  currentRange: AmountRange;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentInfiniteMode: state.settings.infiniteMode,
    currentRange: state.settings.amountRange,
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

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

class SettingsPage extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { currentInfiniteMode, currentRange } = this.props;
    return (
      <div className={styles.settingsPage}>
        <FormattedMessage {...INTL_MESSAGES.pageHeader} tagName="h1" />
        <Setting
          className={styles.setting}
          header={INTL_MESSAGES.amountRangeHeader}
          description={INTL_MESSAGES.amountRangeDescription}
        >
          <ChooserControl
            currentValue={currentRange}
            onChoiceClicked={this.onCurrentRangeChanged}
            choices={AMOUNT_RANGE_CHOICES}
          />
        </Setting>
        <Setting
          className={styles.setting}
          header={INTL_MESSAGES.infiniteModeHeader}
          description={INTL_MESSAGES.infiniteModeDescription}
        >
          <Checkbox
            checked={currentInfiniteMode}
            label={INTL_MESSAGES.infiniteModeCheckboxLabel}
            onChange={this.onInfiniteModeChanged}
          />
        </Setting>
      </div>
    );
  }

  private onCurrentRangeChanged = (amountRange: AmountRange): void => {
    const { dispatch } = this.props;
    dispatch(setAmountRange(amountRange));
  };

  private onInfiniteModeChanged = (infiniteMode: boolean): void => {
    const { dispatch } = this.props;
    dispatch(setInfiniteMode(infiniteMode));
  };
}

export default connect(mapStateToProps)(SettingsPage);

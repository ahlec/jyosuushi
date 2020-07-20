import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { AmountRange, State } from "@jyosuushi/redux";
import { setAmountRange, setInfiniteMode } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import Checkbox from "@jyosuushi/ui/components/Checkbox";
import ChooserControl, {
  Choice,
} from "@jyosuushi/ui/components/chooser-control/ChooserControl";

import { AMOUNT_RANGES } from "@jyosuushi/constants";
import Localization from "@jyosuushi/localization";

import "./SettingsPage.scss";

interface ReduxProps {
  currentInfiniteMode: boolean;
  currentRange: AmountRange;
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentInfiniteMode: state.settings.infiniteMode,
    currentRange: state.settings.amountRange,
    localization: getLocalization(state),
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

const AMOUNT_RANGE_CHOICES = memoize(
  (localization: Localization): ReadonlyArray<Choice<AmountRange>> => {
    const choices: Array<Choice<AmountRange>> = [
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Small].min}–${
          AMOUNT_RANGES[AmountRange.Small].max
        }`,
        title: localization.amountRangeSmall,
        value: AmountRange.Small,
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Medium].min}–${
          AMOUNT_RANGES[AmountRange.Medium].max
        }`,
        title: localization.amountRangeMedium,
        value: AmountRange.Medium,
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Large].min}–${
          AMOUNT_RANGES[AmountRange.Large].max
        }`,
        title: localization.amountRangeLarge,
        value: AmountRange.Large,
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Giant].min}–${
          AMOUNT_RANGES[AmountRange.Giant].max
        }`,
        title: localization.amountRangeGiant,
        value: AmountRange.Giant,
      },
    ];

    return choices;
  }
);

class SettingsPage extends React.PureComponent<ComponentProps> {
  public render(): React.ReactNode {
    const { localization } = this.props;
    return (
      <div className="SettingsPage">
        <h1>{localization.pageSettings}</h1>
        {this.renderAmountRangeSelector()}
        {this.renderInfiniteModeSelector()}
      </div>
    );
  }

  private renderAmountRangeSelector(): React.ReactNode {
    const { currentRange, localization } = this.props;
    return (
      <div className="section">
        <h3>{localization.settingAmountRange}</h3>
        <div className="description">
          {localization.settingAmountRangeDescription}
        </div>
        <ChooserControl
          currentValue={currentRange}
          onChoiceClicked={this.onCurrentRangeChanged}
          choices={AMOUNT_RANGE_CHOICES(localization)}
        />
      </div>
    );
  }

  private onCurrentRangeChanged = (amountRange: AmountRange): void => {
    const { dispatch } = this.props;
    dispatch(setAmountRange(amountRange));
  };

  private renderInfiniteModeSelector(): React.ReactNode {
    const { currentInfiniteMode, localization } = this.props;
    return (
      <div className="section">
        <h3>{localization.settingInfiniteMode}</h3>
        <div className="description">
          {localization.settingInfiniteModeDescription}
        </div>
        <Checkbox
          checked={currentInfiniteMode}
          label={localization.settingInfiniteMode}
          onChange={this.onInfiniteModeChanged}
        />
      </div>
    );
  }

  private onInfiniteModeChanged = (infiniteMode: boolean): void => {
    const { dispatch } = this.props;
    dispatch(setInfiniteMode(infiniteMode));
  };
}

export default connect(mapStateToProps)(SettingsPage);
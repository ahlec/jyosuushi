import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { AmountRange, State } from "../../../redux";
import { setAmountRange, setInfiniteMode } from "../../../redux/actions";
import { getLocalization } from "../../../redux/selectors";
import { Dispatch } from "../../../redux/store";

import { AMOUNT_RANGES } from "../../../constants";
import Localization from "../../../localization";

import Checkbox from "./Checkbox";
import ChooserControl, { Choice } from "./ChooserControl";

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
    localization: getLocalization(state)
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
        value: AmountRange.Small
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Medium].min}–${
          AMOUNT_RANGES[AmountRange.Medium].max
        }`,
        title: localization.amountRangeMedium,
        value: AmountRange.Medium
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Large].min}–${
          AMOUNT_RANGES[AmountRange.Large].max
        }`,
        title: localization.amountRangeLarge,
        value: AmountRange.Large
      },
      {
        subtext: `${AMOUNT_RANGES[AmountRange.Giant].min}–${
          AMOUNT_RANGES[AmountRange.Giant].max
        }`,
        title: localization.amountRangeGiant,
        value: AmountRange.Giant
      }
    ];

    return choices;
  }
);

class SettingsPage extends React.PureComponent<ComponentProps> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="SettingsPage">
        <h1>{localization.pageSettings}</h1>
        {this.renderAmountRangeSelector()}
        {this.renderInfiniteModeSelector()}
      </div>
    );
  }

  private renderAmountRangeSelector() {
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

  private onCurrentRangeChanged = (amountRange: AmountRange) => {
    const { dispatch } = this.props;
    dispatch(setAmountRange(amountRange));
  };

  private renderInfiniteModeSelector() {
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

  private onInfiniteModeChanged = (infiniteMode: boolean) => {
    const { dispatch } = this.props;
    dispatch(setInfiniteMode(infiniteMode));
  };
}

export default connect(mapStateToProps)(SettingsPage);

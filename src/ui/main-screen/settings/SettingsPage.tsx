import { memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { AmountRange, State } from "../../../redux";
import { setAmountRange } from "../../../redux/actions";
import { getLocalization } from "../../../redux/selectors";
import { Dispatch } from "../../../redux/store";

// import { AMOUNT_RANGES } from "../../../constants";
import Localization from "../../../localization";

import ChooserControl, { Choice } from "./ChooserControl";

import "./SettingsPage.scss";

interface ReduxProps {
  currentRange: AmountRange;
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    currentRange: state.settings.amountRange,
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

const AMOUNT_RANGE_CHOICES = memoize(
  (localization: Localization): ReadonlyArray<Choice<AmountRange>> => {
    const choices: Array<Choice<AmountRange>> = [
      {
        title: localization.amountRangeSmall,
        value: AmountRange.Small
      },
      {
        title: localization.amountRangeMedium,
        value: AmountRange.Medium
      },
      {
        title: localization.amountRangeLarge,
        value: AmountRange.Large
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
}

export default connect(mapStateToProps)(SettingsPage);

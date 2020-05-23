import * as React from "react";
import { connect } from "react-redux";

import { State } from "@jyosuushi/redux";
import { markLatestVersion } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import Localization from "@jyosuushi/localization";

import "./ReleaseNotesPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & { dispatch: Dispatch };

class ReleaseNotesPage extends React.PureComponent<ComponentProps> {
  public componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(markLatestVersion());
  }

  public render(): React.ReactNode {
    return null;
  }
}

export default connect(mapStateToProps)(ReleaseNotesPage);

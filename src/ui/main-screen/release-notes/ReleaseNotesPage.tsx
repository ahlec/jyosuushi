import * as React from "react";
import { connect } from "react-redux";

import { State } from "@jyosuushi/redux";
import { markLatestVersion } from "@jyosuushi/redux/actions";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { Dispatch } from "@jyosuushi/redux/store";

import Localization from "@jyosuushi/localization";

import Markdown from "./Markdown";

// We're importing outside of the src/ directory and this is one-off, so
// we'll just make an exception for here.
/* tslint:disable-next-line:no-relative-imports */
import CHANGELOG from "../../../../CHANGELOG.md";

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
    return <Markdown className="ReleaseNotesPage" content={CHANGELOG} />;
  }
}

export default connect(mapStateToProps)(ReleaseNotesPage);

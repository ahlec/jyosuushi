import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../../redux";
import { markLatestVersion } from "../../../redux/actions";
import { getLocalization } from "../../../redux/selectors";
import { Dispatch } from "../../../redux/store";

import Localization from "../../../localization";

import Markdown from "../../Markdown";

import CHANGELOG from "../../../../CHANGELOG.md";

import "./ReleaseNotesPage.scss";

interface ProvidedProps {
  onRequestClose: () => void;
}

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ProvidedProps & ReduxProps & { dispatch: Dispatch };

class ReleaseNotesPage extends React.PureComponent<ComponentProps> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(markLatestVersion());
  }

  public render() {
    return <Markdown className="ReleaseNotesPage" content={CHANGELOG} />;
  }
}

export default connect(mapStateToProps)(ReleaseNotesPage);

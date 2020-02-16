import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import ExplorePageIcon from "./icons/explore-icon.svg";
import FeedbackPageIcon from "./icons/feedback-icon.svg";
import ReleaseNotesPageIcon from "./icons/release-notes-icon.svg";
import SettingsPageIcon from "./icons/settings-icon.svg";
import PreparePageIcon from "./prepare/prepare-icon.svg";

import "./Sidebar.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps;

class Sidebar extends React.Component<ComponentProps> {
  public render() {
    const { localization } = this.props;
    return (
      <div className="Sidebar">
        {this.renderLink(localization.pagePrepare, PreparePageIcon, true)}
        {this.renderLink(localization.pageExplore, ExplorePageIcon, false)}
        {this.renderLink(localization.pageSettings, SettingsPageIcon, false)}
        {this.renderLink(
          localization.pageReleaseNotes,
          ReleaseNotesPageIcon,
          false
        )}
        {this.renderLink(localization.pageFeedback, FeedbackPageIcon, false)}
      </div>
    );
  }

  private renderLink(
    name: string,
    Icon: React.ComponentClass<React.SVGProps<SVGSVGElement>, any>,
    isSelected: boolean
  ) {
    return (
      <div key={name} className={classnames("entry", isSelected && "active")}>
        <Icon />
        {name}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);

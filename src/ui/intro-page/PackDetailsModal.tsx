import * as React from "react";

import Localization from "../../localization";
import { Counter, StudyPack } from "../../redux";

import CounterDetails from "../CounterDetails";
import MultiPageModal from "../MultiPageModal";
import PackDetails from "./PackDetails";

interface ComponentProps {
  localization: Localization;
  onRequestClose: () => void;
  pack: StudyPack | null;
}

export default class PackDetailsModal extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { localization, onRequestClose, pack } = this.props;
    return (
      <MultiPageModal
        getSubpageHeader={this.getSubpageHeader}
        isOpen={!!pack}
        mainPageHeader={pack ? localization.studyPackName(pack) : ""}
        mainPageRenderer={this.renderMainPage}
        onRequestClose={onRequestClose}
        subpageRenderer={this.renderSubpage}
      />
    );
  }

  private getSubpageHeader = (counter: Counter) =>
    this.props.localization.counterName(counter);

  private renderMainPage = (
    isActive: boolean,
    openSubpage: (data: Counter) => void
  ): React.ReactNode => {
    const { localization, pack } = this.props;
    if (!pack) {
      return null;
    }

    return (
      <PackDetails
        enabled={isActive}
        localization={localization}
        onInvestigateCounter={openSubpage}
        pack={pack}
      />
    );
  };

  private renderSubpage = (
    isActive: boolean,
    counter: Counter
  ): React.ReactNode => {
    if (!counter) {
      return null;
    }

    const { localization } = this.props;
    return <CounterDetails counter={counter} localization={localization} />;
  };
}

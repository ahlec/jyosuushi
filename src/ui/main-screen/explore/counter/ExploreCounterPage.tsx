import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";
import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import CollapsibleSection from "@jyosuushi/ui/main-screen/explore/CollapsibleSection";

import ConjugationsSection from "./ConjugationsSection";
import DisambiguationSection, {
  hasDisambiguationSection
} from "./DisambiguationSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";

import "./ExploreCounterPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & RouteComponentProps<{ counterId: string }>;

class ExploreCounterPage extends React.PureComponent<ComponentProps> {
  private get counter(): Counter | null {
    const {
      match: {
        params: { counterId }
      }
    } = this.props;
    return COUNTERS_LOOKUP[counterId] || null;
  }

  public render(): React.ReactNode {
    const {
      counter,
      props: { localization }
    } = this;
    if (!counter) {
      return <Redirect to="/explore" />;
    }

    return (
      <div className="ExploreCounterPage">
        <BreadcrumbBar />
        <div className="contents">
          <h3>{localization.counterName(counter)}</h3>
          <div className="kanji">{counter.kanji}</div>
          {hasInfoSectionContents(counter) && (
            <CollapsibleSection header={localization.counterPageHeaderInfo}>
              <InfoSection counter={counter} localization={localization} />
            </CollapsibleSection>
          )}
          <CollapsibleSection
            header={localization.counterPageHeaderConjugation}
          >
            <ConjugationsSection
              counter={counter}
              localization={localization}
            />
          </CollapsibleSection>
          {hasItemsSectionContents(counter) && (
            <CollapsibleSection header={localization.counterPageHeaderItems}>
              <ItemsSection counter={counter} localization={localization} />
            </CollapsibleSection>
          )}
          {hasDisambiguationSection(counter) && (
            <CollapsibleSection
              header={localization.counterPageHeaderDisambiguation}
            >
              <DisambiguationSection
                counter={counter}
                localization={localization}
              />
            </CollapsibleSection>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExploreCounterPage);

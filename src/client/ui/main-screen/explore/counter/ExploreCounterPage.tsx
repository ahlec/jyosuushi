import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { COUNTERS_LOOKUP } from "@data/counters";
import { Counter } from "@jyosuushi/interfaces";
import Localization from "@jyosuushi/localization";
import { State } from "@jyosuushi/redux";
import { getLocalization } from "@jyosuushi/redux/selectors";
import { getPrimaryJapaneseRepresentation } from "@jyosuushi/utils";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";

import ConjugationsSection from "./ConjugationsSection";
import DisambiguationSection, {
  hasDisambiguationSection,
} from "./DisambiguationSection";
import FootnotesSection from "./FootnotesSection";
import InfoSection, { hasInfoSectionContents } from "./InfoSection";
import ItemsSection, { hasItemsSectionContents } from "./ItemsSection";
import SectionContainer from "./SectionContainer";

import styles from "./ExploreCounterPage.scss";

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state),
  };
}

type ComponentProps = ReduxProps & RouteComponentProps<{ counterId: string }>;

class ExploreCounterPage extends React.PureComponent<ComponentProps> {
  private get counter(): Counter | null {
    const {
      match: {
        params: { counterId },
      },
    } = this.props;
    return COUNTERS_LOOKUP[counterId] || null;
  }

  public render(): React.ReactNode {
    const {
      counter,
      props: { localization },
    } = this;
    if (!counter) {
      return <Redirect to="/explore" />;
    }

    return (
      <div className={styles.exploreCounterPage}>
        <BreadcrumbBar />
        <div className={styles.contents}>
          <h3>{localization.counterName(counter)}</h3>
          <div className={styles.kanji}>
            {getPrimaryJapaneseRepresentation(counter)}
          </div>
          {counter.leadIn && (
            <div className={styles.leadIn}>{counter.leadIn}</div>
          )}
          {hasInfoSectionContents(counter) && (
            <SectionContainer header={localization.counterPageHeaderInfo}>
              <InfoSection counter={counter} localization={localization} />
            </SectionContainer>
          )}
          <SectionContainer header={localization.counterPageHeaderConjugation}>
            <ConjugationsSection
              counter={counter}
              localization={localization}
            />
          </SectionContainer>
          {hasItemsSectionContents(counter) && (
            <SectionContainer header={localization.counterPageHeaderItems}>
              <ItemsSection counter={counter} localization={localization} />
            </SectionContainer>
          )}
          {hasDisambiguationSection(counter) && (
            <SectionContainer
              header={localization.counterPageHeaderDisambiguation}
            >
              <DisambiguationSection
                counter={counter}
                localization={localization}
              />
            </SectionContainer>
          )}
          {counter.footnotes.length > 0 && (
            <SectionContainer header={localization.counterPageHeaderFootnotes}>
              <FootnotesSection footnotes={counter.footnotes} />
            </SectionContainer>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExploreCounterPage);

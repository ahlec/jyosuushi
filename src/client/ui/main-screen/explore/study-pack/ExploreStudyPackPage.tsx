import React from "react";
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom";

import { STUDY_PACK_LOOKUP } from "@data/studyPacks";

import { Counter } from "@jyosuushi/interfaces";

import CounterDisplay from "@jyosuushi/ui/components/CounterDisplay";
import RightIcon from "@jyosuushi/ui/right.svg";

import BreadcrumbBar from "@jyosuushi/ui/main-screen/explore/BreadcrumbBar";
import { getCounterLink } from "@jyosuushi/ui/main-screen/explore/pathing";

import styles from "./ExploreStudyPackPage.scss";
import useLocale from "@jyosuushi/i18n/useLocale";

type ComponentProps = RouteComponentProps<{ packId: string }>;

function ExploreStudyPackPage({
  match: {
    params: { packId },
  },
}: ComponentProps): React.ReactElement {
  // Find the study pack based on the URL
  const studyPack = STUDY_PACK_LOOKUP[packId] || null;

  // Connect to the rest of the app
  const locale = useLocale();
  const history = useHistory();

  // Redirect if the study pack doesn't exist
  if (!studyPack) {
    return <Redirect to="/explore" />;
  }

  const { counters } = studyPack;
  return (
    <div className={styles.exploreStudyPackPage}>
      <BreadcrumbBar />
      <h3>{locale.dataLocalizers.getStudyPackName(studyPack)}</h3>
      <p>
        This pack contains{" "}
        <strong>
          {counters.length} {counters.length === 1 ? "counter" : "counters"}
        </strong>
        :
      </p>
      <table>
        <tbody>
          {counters.map(
            (counter: Counter): React.ReactNode => {
              return (
                <tr
                  key={counter.counterId}
                  className={styles.counter}
                  onClick={(): void =>
                    history.push({
                      pathname: getCounterLink(counter),
                      state: {
                        fromStudyPack: packId,
                      },
                    })
                  }
                >
                  <td className={styles.jp}>
                    <CounterDisplay
                      className={styles.counterDisplay}
                      counter={counter}
                    />
                  </td>
                  <td className={styles.name}>
                    {locale.dataLocalizers.getCounterName(counter)}
                  </td>
                  <td className={styles.button}>
                    <RightIcon />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExploreStudyPackPage;

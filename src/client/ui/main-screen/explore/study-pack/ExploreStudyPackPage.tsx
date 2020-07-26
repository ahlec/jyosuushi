import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
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

const INTL_MESSAGES = defineMessages({
  contentsIntro: {
    defaultMessage:
      "This pack contains <bold>{numCounters, plural, one {# counter} other {# counters}}</bold>:",
    id: "explorePage.studyPackPage.contentsIntro",
  },
});

function FormattedMessageBold(
  chunks: readonly React.ReactNode[]
): React.ReactElement {
  return <strong>{chunks}</strong>;
}

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
      <FormattedMessage
        {...INTL_MESSAGES.contentsIntro}
        values={{
          bold: FormattedMessageBold,
          numCounters: counters.length,
        }}
        tagName="p"
      />
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

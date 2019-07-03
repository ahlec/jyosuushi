import * as React from "react";
import { Link } from "react-router-dom";

import { StudyPack } from "../../../interfaces";

import { STUDY_PACKS } from "../../../../data/studyPacks";

import { getStudyPackLink } from "./constants";

export default class AllStudyPacks extends React.PureComponent {
  public render() {
    return <div>{STUDY_PACKS.map(this.renderStudyPack)}</div>;
  }

  private renderStudyPack = (studyPack: StudyPack) => {
    return (
      <Link key={studyPack.packId} to={getStudyPackLink(studyPack)}>
        {studyPack.englishName}
      </Link>
    );
  };
}

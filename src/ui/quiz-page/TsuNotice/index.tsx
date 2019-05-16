import * as React from "react";

import TsuWarningModel from "./model";

export default class TsuNotice extends React.PureComponent {
  private readonly model: TsuWarningModel;

  public constructor(props: any) {
    super(props);
    this.model = TsuWarningModel.get();
  }

  public render() {
    if (this.model.numWarnings <= 0) {
      return null;
    }

    return null;
  }
}

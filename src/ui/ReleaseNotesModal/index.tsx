import * as React from "react";
import { connect } from "react-redux";
import { markLatestVersion } from "../../redux/actions";
import { Dispatch } from "../../redux/store";

import Localization from "../../localization";

import Modal from "../Modal";

interface ProvidedProps {
  localization: Localization;
  onRequestClose: () => void;
}

type ComponentProps = ProvidedProps & { dispatch: Dispatch };

class ReleaseNotesModal extends React.PureComponent<ComponentProps> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(markLatestVersion());
  }

  public render() {
    const { localization, onRequestClose } = this.props;
    return (
      <Modal
        className="ReleaseNotesModal"
        header={localization.releaseNotes}
        isOpen={true}
        onRequestClose={onRequestClose}
      >
        Test
      </Modal>
    );
  }
}

export default connect()(ReleaseNotesModal);

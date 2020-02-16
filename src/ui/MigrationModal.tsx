import { noop } from "lodash";
import React from "react";

import Modal from "./Modal";

import "./MigrationModal.scss";

export default class MigrationModal extends React.PureComponent {
  public render() {
    return (
      <Modal
        className="MigrationModal"
        header="We've moved!"
        isOpen={true}
        onRequestClose={noop}
        canClose={false}
      >
        <div className="container">
          <div>
            I'm super excited to announce that you can update your bookmarks to:
          </div>
          <a className="new-url" href="https://www.jyosuushi.com/">
            https://www.jyosuushi.com
          </a>
          <p>
            Over 2020, I hope to continue to develop this program into not just
            the best study tool available for counters, but into a program that
            can serve as your encyclopedia and a place to learn about counters.
          </p>
          <p className="signature">&mdash; Alec</p>
        </div>
      </Modal>
    );
  }
}

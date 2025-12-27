import React from "react";

import ToastDisplay from "./ToastDisplay";
import { Toast } from "./types";
import useToast from "./useToast";

import * as styles from "./ToastDisplayContainer.scss";

function ToastDisplayContainer(): React.ReactElement {
  // Connect to the rest of the app
  const { currentToasts } = useToast();

  // Render the component
  return (
    <div className={styles.toastDisplayContainer}>
      {currentToasts.map(
        (toast: Toast): React.ReactElement => (
          <ToastDisplay key={toast.id} className={styles.toast} toast={toast} />
        )
      )}
    </div>
  );
}

export default ToastDisplayContainer;

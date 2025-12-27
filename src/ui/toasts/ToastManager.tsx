import React, { useMemo, useState } from "react";

import { TOAST_CONTEXT } from "./context";
import { Toast, ToastContext, ToastDefinition } from "./types";

interface ComponentProps {
  children: React.ReactElement;
}

const { Provider: ToastContextProvider } = TOAST_CONTEXT;

function ToastManager({ children }: ComponentProps): React.ReactElement {
  // Define state and variables
  const [openToasts, setOpenToasts] = useState<readonly Toast[]>([]);
  const [nextToastId, setNextToastId] = useState<number>(0);

  // Manage the value of the context being provided
  const contextValue = useMemo<ToastContext>(
    (): ToastContext => ({
      closeToast: (id: string): void => {
        const cleared = openToasts.filter(
          (toast: Toast): boolean => toast.id !== id,
        );
        if (cleared.length === openToasts.length) {
          console.warn(
            `Unable to find an open toast with the ID of '${id}'. This is a noop.`,
          );
          return;
        }

        setOpenToasts(cleared);
      },
      currentToasts: openToasts,
      openToast: (definition: ToastDefinition): void => {
        const toastId = nextToastId;
        setNextToastId(nextToastId + 1);
        setOpenToasts([
          ...openToasts,
          { ...definition, id: `toast-${toastId}` },
        ]);
      },
    }),
    [nextToastId, openToasts],
  );

  // Provide context and continue to render DOM
  return (
    <ToastContextProvider value={contextValue}>{children}</ToastContextProvider>
  );
}

export default ToastManager;

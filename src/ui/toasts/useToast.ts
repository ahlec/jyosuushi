import { useContext } from "react";

import { TOAST_CONTEXT } from "./context";
import { ToastContext } from "./types";

function stubNoop(): void {
  console.warn(
    "Toast context is being used but has not been provided. This is a noop.",
  );
}

const STUB_CONTEXT: ToastContext = {
  closeToast: stubNoop,
  currentToasts: [],
  openToast: stubNoop,
};

function useToast(): ToastContext {
  const value = useContext(TOAST_CONTEXT);
  if (value) {
    return value;
  }

  // We shouldn't ever get here under normal runtime circumstances,
  // but this will catch us when we're doing testing or other areas
  // to fall back on rather than outright asserting that the context
  // is always provided.
  return STUB_CONTEXT;
}

export default useToast;

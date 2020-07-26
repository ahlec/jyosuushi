import { MessageDescriptor } from "react-intl";

export type ToastVariant = "success";

export interface ToastDefinition {
  message: MessageDescriptor;
  variant: ToastVariant;
}

export interface Toast extends ToastDefinition {
  /**
   * An ID that is unique to this toast that can be used to
   * uniquely identify this. This ID will never be reused
   * and will not change after creation.
   */
  readonly id: string;
}

export interface ToastContext {
  /**
   * Closes a toast by a given ID.
   */
  closeToast: (toastId: string) => void;

  /**
   * An ordered array of all of the toasts that are currently
   * opened, in order of when they were opened.
   */
  currentToasts: readonly Toast[];

  /**
   * Opens a new toast.
   */
  openToast: (toast: ToastDefinition) => void;
}

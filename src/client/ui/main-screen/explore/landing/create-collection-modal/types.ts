import { MessageDescriptor } from "react-intl";

export interface CreateCollectionFormError {
  message: MessageDescriptor;
  messageValues: Record<string, unknown>;
}

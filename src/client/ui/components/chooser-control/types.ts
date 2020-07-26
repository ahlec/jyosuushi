import { MessageDescriptor } from "react-intl";

interface LocalizedText {
  descriptor: MessageDescriptor;
  values?: Record<string, unknown>;
}

export interface Choice<TValue> {
  id: string;
  title: LocalizedText;
  subtext?: LocalizedText;
  value: TValue;
}

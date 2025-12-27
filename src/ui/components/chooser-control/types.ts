import { MessageDescriptor, PrimitiveType } from "react-intl";

interface LocalizedText {
  descriptor: MessageDescriptor;
  values?: Record<string, React.ReactNode | PrimitiveType>;
}

export interface Choice<TValue> {
  id: string;
  title: LocalizedText;
  subtext?: LocalizedText;
  value: TValue;
}

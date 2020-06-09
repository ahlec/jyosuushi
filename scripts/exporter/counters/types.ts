interface CounterMarkdownComponent {
  componentName: string;
  markdown: string;
  footnotesLocalToUniversal: { [localId: string]: string };
}

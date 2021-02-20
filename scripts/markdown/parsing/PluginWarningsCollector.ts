class PluginWarningsCollector {
  public readonly warnings: string[] = [];

  public add(message: string): void {
    this.warnings.push(message);
  }
}

export default PluginWarningsCollector;

class IdTracker {
  private nextNumber: number;
  private readonly definedIds: { [label: string]: number | undefined } = {};

  public constructor(startNumber: number) {
    this.nextNumber = startNumber;
  }

  public getId(label: string): number {
    let id = this.definedIds[label];
    if (typeof id === "number") {
      return id;
    }

    id = this.nextNumber;
    ++this.nextNumber;
    this.definedIds[label] = id;
    return id;
  }
}

export default IdTracker;

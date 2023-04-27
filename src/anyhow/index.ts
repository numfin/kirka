import { Err } from "../index.js";

export interface Display {
  toString(): string;
}

export class AnyHow implements Display {
  private constructor(private err: Display, private ctx = [] as string[]) {}

  static msg(msg: string) {
    return new this(msg);
  }
  static expect(expected: Display, got: Display) {
    return this.msg(`Expected ${expected}, got: ${got}`);
  }
  wrapWith(msgFn: () => string) {
    this.ctx.push(msgFn());
    return this;
  }
  toString(): string {
    const report = Array.from(this.ctx);
    report.push(this.err.toString());
    return report.reverse().join("\n");
  }
  toErr<T>() {
    return Err<T, AnyHow>(this);
  }
}

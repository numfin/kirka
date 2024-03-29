import { Err } from "../index.js";

export interface Display {
  toString(): string;
}

export class AnyHow implements Display {
  private constructor(public err: Display, public ctx = [] as string[]) {}

  static msg(msg: string) {
    return new AnyHow(msg);
  }
  static expect(expected: Display, got: Display) {
    return AnyHow.msg(`Expected ${expected}, got: ${got}`);
  }
  wrapWith(msgFn: () => string) {
    return new AnyHow(this.err, this.ctx.concat(msgFn()));
  }
  toString(): string {
    const report = [this.err.toString()].concat(this.ctx);
    return report.join("\n");
  }
  toErr<T>() {
    return Err<T, AnyHow>(this);
  }
}

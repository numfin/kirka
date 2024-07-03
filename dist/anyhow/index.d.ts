import { Display } from "../traits/display.js";
export declare class AnyHow implements Display {
    err: Display;
    ctx: string[];
    private constructor();
    static msg(msg: string): AnyHow;
    static expect(expected: Display, got: Display): AnyHow;
    wrapWith(msgFn: () => string): AnyHow;
    toString(): string;
    toErr<T>(): import("../index.js").ResultNew<T, AnyHow>;
}
//# sourceMappingURL=index.d.ts.map
export interface Display {
    toString(): string;
}
export declare class AnyHow implements Display {
    err: Display;
    ctx: string[];
    private constructor();
    static msg(msg: string): AnyHow;
    static expect(expected: Display, got: Display): AnyHow;
    wrapWith(msgFn: () => string): AnyHow;
    toString(): string;
    toErr<T>(): import("../index.js").Result<T, AnyHow>;
}
//# sourceMappingURL=index.d.ts.map
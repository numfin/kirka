export interface Display {
    toString(): string;
}
export declare class AnyHow implements Display {
    private err;
    private ctx;
    private constructor();
    static msg(msg: string): AnyHow;
    static expect(expected: Display, got: Display): AnyHow;
    wrapWith(msgFn: () => string): this;
    toString(): string;
    toErr<T>(): import("../index.js").Result<T, AnyHow>;
}
//# sourceMappingURL=index.d.ts.map
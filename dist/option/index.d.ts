import { OptionUnion } from "./base.js";
import { OptionPipe } from "./middleware/middleware.js";
export declare class NewOption<T> {
    inner: OptionUnion<T>;
    [Symbol.iterator](): Generator<T, void, unknown>;
    constructor(inner: OptionUnion<T>);
    static None: <T_1>() => NewOption<T_1>;
    static Some<T>(value: T): NewOption<T>;
    static fromBool(predicate: boolean): NewOption<unknown>;
    static fromNullable<T>(v?: T | null): NewOption<unknown>;
    isSome(): boolean;
    isNone(): boolean;
    unwrap(): T;
    clone(): NewOption<T>;
    do<Out>(fn: OptionPipe<T, Out>): Out;
    pipe<Args extends unknown[], Out>(fn: (...args: Args) => OptionPipe<T, Out>): (...args: Args) => Out;
    eq<U>(other: NewOption<T>, by?: (x: T) => U): boolean;
    match<U>(onSome: (v: T) => U, onNone: () => U): U;
}
export declare const Some: typeof NewOption.Some;
export declare const None: <T>() => NewOption<T>;
//# sourceMappingURL=index.d.ts.map
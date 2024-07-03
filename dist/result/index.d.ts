import { ResultUnion } from "./base.js";
import { ResultPipe } from "./middleware/middleware.js";
export declare class ResultNew<T, E> {
    inner: ResultUnion<T, E>;
    [Symbol.iterator](): Generator<T, void, unknown>;
    constructor(inner: ResultUnion<T, E>);
    static Ok<T, E>(value: T): ResultNew<T, E>;
    static Err<T, E>(err: E): ResultNew<T, E>;
    static tryFn<T, E>(fn: () => T): ResultNew<T, unknown> | ResultNew<unknown, E>;
    static tryAsync<T, E>(fn: () => Promise<T>): Promise<ResultNew<T, E>>;
    eq(other: ResultNew<T, E>): boolean;
    isOk(): boolean;
    isErr(): boolean;
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    unwrapErr(): E;
    unwrapErrOr(defaultErr: E): E;
    match<U>(onOk: (v: T) => U, onErr: (e: E) => U): U;
    do<Out>(fn: ResultPipe<T, E, Out>): Out;
    pipe<Args extends unknown[], Out>(fn: (...args: Args) => ResultPipe<T, E, Out>): (...args: Args) => Out;
}
export declare const Ok: typeof ResultNew.Ok;
export declare const Err: typeof ResultNew.Err;
//# sourceMappingURL=index.d.ts.map
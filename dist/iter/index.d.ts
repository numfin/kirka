import { IterPipe } from "./middleware/middleware.js";
import type { ClonnableGenerator } from "./interfaces.js";
export declare class Iter<T> {
    source: ClonnableGenerator<T>;
    private inner;
    [Symbol.iterator](): Generator<T, any, unknown>;
    constructor(source: ClonnableGenerator<T>);
    static infinite(): Iter<undefined>;
    static from<T>(source: Iterable<T>): Iter<T>;
    static fromRange(from: number, to: number, inclusive?: boolean): Iter<number>;
    clone(): Iter<T>;
    next(): import("../index.js").Option<T>;
    do<Out>(fn: IterPipe<T, Out>): Out;
    pipe<Args extends unknown[], Out>(fn: (...args: Args) => IterPipe<T, Out>): (...args: Args) => Out;
}
//# sourceMappingURL=index.d.ts.map
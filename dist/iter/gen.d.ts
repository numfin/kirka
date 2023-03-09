import { ClonnableGenerator } from "./interfaces";
export declare const defaultFilter: <T>(_item: T) => boolean;
export declare const defaultMap: <T, U>(item: T) => U;
export declare function iterFactory<T, U = T>(source: Iterable<T>, map?: (item: T) => U, filter?: (_item: U) => boolean): Generator<U, void, unknown>;
export declare function iterInfinite(): Generator<undefined, void, unknown>;
export declare function iterEnumerate<T>(source: Iterable<T>): Generator<{
    item: T;
    index: number;
}, void, unknown>;
export declare function iterSkipWhile<T>(source: Iterable<T>, filter: (item: T) => boolean): Generator<T, void, unknown>;
export declare function iterTakeWhile<T>(source: Iterable<T>, filter: (item: T) => boolean): Generator<T, void, unknown>;
export declare function iterCycle<T>(source: ClonnableGenerator<T>): Generator<T, void, unknown>;
export declare function iterFlat<T>(source: Iterable<Iterable<T>>): Generator<T, void, unknown>;
//# sourceMappingURL=gen.d.ts.map
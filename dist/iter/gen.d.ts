export declare const defaultFilter: <T>(item: T) => boolean;
export declare const defaultMap: <T, U>(item: T) => U;
export declare function iterFactory<T, U>(source: Iterable<T>, map?: (item: T) => U, filter?: (item: U) => boolean): Generator<U, void, unknown>;
export declare function iterInfinite<T>(): Generator<undefined, void, unknown>;
export declare function iterEnumerate<T>(source: Iterable<T>): Generator<{
    item: T;
    index: number;
}, void, unknown>;
export declare function iterSkipWhile<T>(source: Iterable<T>, filter: (item: T) => boolean): Generator<T, void, unknown>;
export declare function iterTakeWhile<T>(source: Iterable<T>, filter: (item: T) => boolean): Generator<T, void, unknown>;
//# sourceMappingURL=gen.d.ts.map
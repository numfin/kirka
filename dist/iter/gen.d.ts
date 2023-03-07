export declare const defaultFilter: <T>(item: T) => boolean;
export declare const defaultMap: <T, U>(item: T) => U;
export declare const iterFactory: <T, U>(source: Iterable<T>, map?: (item: T) => U, filter?: (item: U) => boolean) => Generator<U, void, unknown>;
//# sourceMappingURL=gen.d.ts.map
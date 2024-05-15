export type WithIndex<T> = {
    item: T;
    index: number;
};
export declare function enumerate<T>(): import("../middleware/remap.js").MiddlewareRemap<T, WithIndex<T>>;
//# sourceMappingURL=enumerate.d.ts.map
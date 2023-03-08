export declare function useSpy<T extends unknown[], U>(fn: (...args: T) => U): {
    spy: (...args: T) => U;
    calledTimes: () => number;
    calledWith: () => T[];
};
//# sourceMappingURL=spy.d.ts.map
export declare function useSpy<T extends unknown[], U>(fn: (...args: T) => U): {
    spy: (...args: T) => U;
    calledTimes: () => number;
    calledWith: (callNth: number) => T;
};
//# sourceMappingURL=spy.d.ts.map
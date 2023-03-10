export interface Flow<Args extends unknown[], Output> {
    /** add mapper to flow */
    map<NewOutput>(mapper: (a: Output) => NewOutput): Flow<Args, NewOutput>;
    /** clone flow and add mapper to flow */
    mapClone<NewOutput>(mapper: (a: Output) => NewOutput): Flow<Args, NewOutput>;
    chain<NewOutput>(mapper: (a: Output) => NewOutput): Flow<Args, [Output, NewOutput]>;
    build(): (...args: Args) => Output;
    clone(): Flow<Args, Output>;
}
export declare function flow<Args extends unknown[], Out>(map: (...args: Args) => Out): Flow<Args, Out>;
//# sourceMappingURL=pipe.d.ts.map
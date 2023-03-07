interface FlowApi<Args extends unknown[], Output> {
    map<NewOutput>(mapper: (a: Output) => NewOutput): FlowApi<Args, NewOutput>;
    chain<NewOutput>(mapper: (a: Output) => NewOutput): FlowApi<Args, [Output, NewOutput]>;
    build(): (...args: Args) => Output;
}
export declare function flow<Args extends unknown[], Out>(map: (...args: Args) => Out): FlowApi<Args, Out>;
export declare function pipe<Args extends unknown[], Out>(value: Out): FlowApi<Args, Out>;
export {};
//# sourceMappingURL=index.d.ts.map
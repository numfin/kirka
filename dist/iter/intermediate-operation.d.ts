import { M } from "../maybe";
export declare abstract class IntermidiateOperation<A, B> {
    readonly isFlat: boolean;
    protected terminated: boolean;
    constructor(isFlat?: boolean);
    get isTerminated(): boolean;
    abstract execute(v: A): M.Maybe<B>;
    protected terminate(): void;
}
//# sourceMappingURL=intermediate-operation.d.ts.map
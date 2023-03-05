import { M } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";
export declare class FilterOperation<A, B extends A = A> extends IntermidiateOperation<A, B> {
    private readonly predicate;
    constructor(predicate: (v: A, terminate: () => void) => v is B);
    execute(value: A): M.Maybe<B>;
}
//# sourceMappingURL=filter-operation.d.ts.map
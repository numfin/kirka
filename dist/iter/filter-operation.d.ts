import { IntermidiateOperation } from "./intermediate-operation";
import type { Maybe } from "../maybe";
export declare class FilterOperation<A, B extends A = A> extends IntermidiateOperation<A, B> {
    private readonly predicate;
    constructor(predicate: (v: A, terminate: () => void) => v is B);
    execute(value: A): Maybe<B>;
}
//# sourceMappingURL=filter-operation.d.ts.map
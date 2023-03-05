import { M } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";
export declare class MapOperation<A, B> extends IntermidiateOperation<A, B> {
    private readonly fn;
    constructor(fn: (v: A, terminate: () => void) => B);
    constructor(fn: (v: A, terminate: () => void) => Iterable<B>, isFlat: true);
    execute(value: A): M.Maybe<B>;
}
//# sourceMappingURL=map-operation.d.ts.map
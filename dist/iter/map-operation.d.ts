import { IntermidiateOperation } from "./intermediate-operation";
import type { Maybe } from "../maybe";
export declare class MapOperation<A, B> extends IntermidiateOperation<A, B> {
    private readonly fn;
    constructor(fn: (v: A, terminate: () => void) => B);
    constructor(fn: (v: A, terminate: () => void) => Iterable<B>, isFlat: true);
    execute(value: A): Maybe<B>;
}
//# sourceMappingURL=map-operation.d.ts.map
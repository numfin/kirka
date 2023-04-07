import { Iter } from "../interfaces.js";
export declare function flatMap<T, U>(source: Iter<T>, fn: (item: T) => Iterable<U>): Generator<U, void, unknown>;
//# sourceMappingURL=flatMap.d.ts.map
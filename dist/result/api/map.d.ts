import { ResultUnion } from "../interfaces.js";
export declare function map<T, E, U>(result: ResultUnion<T, E>, fn: (value: T) => U): import("../interfaces.js").Err<E> | import("../interfaces.js").Ok<U>;
//# sourceMappingURL=map.d.ts.map
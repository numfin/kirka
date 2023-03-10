import { ResultUnion } from "../interfaces";
export declare function map<T, E, U>(result: ResultUnion<T, E>, fn: (value: T) => U): import("../interfaces").Err<E> | import("../interfaces").Ok<U>;
//# sourceMappingURL=map.d.ts.map
import { ResultUnion } from "../interfaces.js";
export declare function mapErr<T, E, U>(result: ResultUnion<T, E>, fn: (value: E) => U): import("../interfaces.js").Ok<T> | import("../interfaces.js").Err<U>;
//# sourceMappingURL=mapErr.d.ts.map
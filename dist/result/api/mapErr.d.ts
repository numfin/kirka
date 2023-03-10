import { ResultUnion } from "../interfaces";
export declare function mapErr<T, E, U>(result: ResultUnion<T, E>, fn: (value: E) => U): import("../interfaces").Ok<T> | import("../interfaces").Err<U>;
//# sourceMappingURL=mapErr.d.ts.map
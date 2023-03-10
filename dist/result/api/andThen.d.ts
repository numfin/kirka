import { Result } from "../interfaces";
export declare function andThen<T, E, U>(result: Result<T, E>, fn: (value: T) => Result<U, E>): import("../interfaces").ResultUnion<U, E>;
//# sourceMappingURL=andThen.d.ts.map
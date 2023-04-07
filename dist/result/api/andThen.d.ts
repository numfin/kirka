import { Result } from "../interfaces.js";
export declare function andThen<T, E, U = T>(result: Result<T, E>, fn: (value: T) => Result<U, E>): import("../interfaces.js").ResultUnion<U, E>;
//# sourceMappingURL=andThen.d.ts.map
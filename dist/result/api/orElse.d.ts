import { Result } from "../interfaces.js";
export declare function orElse<T, E, U>(result: Result<T, E>, fn: (value: E) => Result<T, U>): import("../interfaces.js").ResultUnion<T, U>;
//# sourceMappingURL=orElse.d.ts.map
import { Result } from "../interfaces";
export declare function orElse<T, E, U>(result: Result<T, E>, fn: (value: E) => Result<T, U>): import("../interfaces").ResultUnion<T, U>;
//# sourceMappingURL=orElse.d.ts.map
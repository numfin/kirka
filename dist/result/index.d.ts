export { ResultFrom as EitherFrom } from "./from";
export * from "./interfaces";
import type { Result, ResultUnion } from "./interfaces";
export declare function createResult<T, E>(result: ResultUnion<T, E>): Result<T, E>;
export declare function Ok<T, E>(value: T): Result<T, E>;
export declare function Err<T, E>(value: E): Result<T, E>;
//# sourceMappingURL=index.d.ts.map
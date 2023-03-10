export { ResultFrom } from "./from";
export * from "./interfaces";
import type { Result, ResultUnion } from "./interfaces";
export declare function createResult<T, E>(result: ResultUnion<T, E>): Result<T, E>;
export declare function Ok<T, E>(value: T): Result<T, E>;
export declare function Err<T, E>(value: E): Result<T, E>;
/**
 * Wrapps `fn` into `tryCatch` returning result as `Ok<T>` and error as `Err<E>`
 * # Example
 * ```ts
 * tryFn(() => {
 *  throw new Error(`Oh no!`)
 * })
 * .map(data => console.log(data))
 * .or(err => console.log(err))
 * ```
 */
export declare function tryFn<T, E>(fn: () => T): Result<T, E>;
//# sourceMappingURL=index.d.ts.map
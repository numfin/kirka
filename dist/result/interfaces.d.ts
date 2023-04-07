import type { Option } from "../option/interfaces.js";
export interface Ok<T> {
    type: "Ok";
    value: T;
}
export interface Err<T> {
    type: "Err";
    value: T;
}
export type ResultUnion<L, R> = Ok<L> | Err<R>;
export interface Result<T, Err> {
    /**
     * Just a simple data formatter
     * # Example
     * ```ts
     * Ok(3).format() // `Result.Ok(3)`
     *
     * // or if you want to format your value yourself
     * Err({ x: 3 }).format((v) => JSON.stringify(v.inner().value, null, 2))
     * ```
     */
    format(formatter?: (result: Result<T, Err>) => string): string;
    /**
     * Compare two `Result`'s to each other
     * # Example
     * ```ts
     * Ok(3).eq(Ok(3)) // true
     * Ok(3).eq(Err(3)) // false
     * Ok(3).eq(Ok(4)) // false
     * Err(3).eq(Err(3)) // true
     * ```
     */
    eq(v: Result<T, Err>): boolean;
    /**
     * Extract internals as union. Useful when you want to handle result yourself
     * # Example
     * ```ts
     * const result = Ok(3).inner();
     * if (result.type === "Ok") {
     *   result.value // number
     * }
     * ```
     */
    inner(): ResultUnion<T, Err>;
    /**
     * Returns `true` if result is `Ok`
     * # Example
     * ```ts
     * Ok(3).isOk() // true
     * Err(3).isOk() // false
     * ```
     */
    isOk(): boolean;
    /**
     * Returns `true` if result is `Err`
     * # Example
     * ```ts
     * Ok(3).isErr() // false
     * Err(3).isErr() // true
     * ```
     */
    isErr(): boolean;
    /**
     * Returns the contained `Ok` value. It is preferred to use other methods rather than using `unwrap`
     *
     * But it's useful for quick prototyping or when you know type inside
     *
     * # Throws
     * When value is `Err`
     * # Example
     * ```ts
     * const result = Ok(3);
     * if (result.isOk()) {
     *   result.unwrap() // number
     * }
     * ```
     */
    unwrap(): T;
    /**
     * Returns the contained `Err` value. It is preferred to use other methods rather than using `unwrap`
     *
     * But it's useful for quick prototyping or when you know type inside
     *
     * # Throws
     * When value is `Ok`
     * # Example
     * ```ts
     * const result = Ok(3);
     * if (result.isOk()) {
     *   result.unwrap() // number
     * }
     * ```
     */
    unwrapErr(): Err;
    /**
     * Returns the contained `Ok` or default value.
     *
     * # Example
     * ```ts
     * Ok(3).unwrapOr(4) // 3
     * Err(4).unwrapOr(3) // 3
     * ```
     */
    unwrapOr(v: T): T;
    /**
     * Returns the contained `Err` or default value.
     *
     * # Example
     * ```ts
     * Ok(3).unwrapErrOr(4) // 4
     * Err(4).unwrapErrOr(3) // 4
     * ```
     */
    unwrapErrOr(v: Err): Err;
    /**
     * Returns `true` if value `Ok` and predicate `fn` returns `true`.
     *
     * # Example
     * ```ts
     * Ok(3).isOkAnd(v => v === 3) // true
     * Ok(3).isOkAnd(v => v === 4) // false
     * Err(3).isOkAnd(v => v === 3) // false
     * Err(3).isOkAnd(v => v === 4) // false
     * ```
     */
    isOkAnd(fn: (v: T) => boolean): boolean;
    /**
     * Returns `true` if value `Err` and predicate `fn` returns `true`.
     *
     * # Example
     * ```ts
     * Ok(3).isOkAnd(v => v === 3) // false
     * Ok(3).isOkAnd(v => v === 4) // false
     * Err(3).isOkAnd(v => v === 3) // true
     * Err(3).isOkAnd(v => v === 4) // false
     * ```
     */
    isErrAnd(fn: (v: Err) => boolean): boolean;
    /**
     * Changes contained value if `Ok` by applying `fn` to previous `Ok`.
     *
     * # Example
     * ```ts
     * Ok(3).map(v => "value") // Ok("value")
     * Err(3).map(v => "value") // Err(3)
     * ```
     */
    map<U>(fn: (v: T) => U): Result<U, Err>;
    /**
     * Changes contained value if `Err` by applying `fn` to previous `Err`.
     *
     * # Example
     * ```ts
     * Ok(3).mapErr(v => "value") // Ok(3)
     * Err(3).mapErr(v => "value") // Err("value")
     * ```
     */
    mapErr<U>(fn: (v: Err) => U): Result<T, U>;
    /**
     * Take a peek to contained `Ok` value
     *
     * # Example
     * ```ts
     * Ok(3).inspect(v => console.log(v)) // "3"
     * Err(3).inspect(v => console.log(v)) // *nothing*
     * ```
     */
    inspect(fn: (v: T) => unknown): Result<T, Err>;
    /**
     * Take a peek to contained `Err` value
     *
     * # Example
     * ```ts
     * Ok(3).inspect(v => console.log(v)) // *nothing*
     * Err(3).inspect(v => console.log(v)) // "3"
     * ```
     */
    inspectErr(fn: (v: Err) => unknown): Result<T, Err>;
    /**
     * Calls `fn` if the result is `Ok`, otherwise returns the `Err` value.
     *
     * This function can be used for control flow based on `Result` values.
     * # Example
     * ```ts
     * Ok<number, number>(3).andThen(v => Ok("value")) // Ok("value")
     * Ok<number, number>(3).andThen(v => Err(6)) // Err(6)
     * Err<number, number>(3).andThen(v => Ok("value")) // Err(3)
     * Err<number, number>(3).andThen(v => Err(6)) // Err(3)
     * ```
     */
    andThen<U = T>(fn: (v: T) => Result<U, Err>): Result<U, Err>;
    /**
     * Calls `fn` if the result is `Err`, otherwise returns the `Ok` value.
     *
     * This function can be used for control flow based on `Result` values.
     * # Example
     * ```ts
     * Ok<number, number>(3).orElse(v => Ok(6)) // Ok(3)
     * Ok<number, number>(3).orElse(v => Err("err")) // Err(3)
     * Err<number, number>(3).orElse(v => Ok(6)) // Ok(6)
     * Err<number, number>(3).orElse(v => Err("err")) // Err("err")
     * ```
     */
    orElse<U = Err>(fn: (v: Err) => Result<T, U>): Result<T, U>;
    /**
     * Returns result if the result is `Ok`, otherwise returns the `Err` value.
     *
     * This function can be used for control flow based on `Result` values.
     * # Example
     * ```ts
     * Ok<number, number>(3).and(Ok("value")) // Ok("value")
     * Ok<number, number>(3).and(Err(6)) // Err(6)
     * Err<number, number>(3).and(Ok("value")) // Err(3)
     * Err<number, number>(3).and(Err(6)) // Err(3)
     * ```
     */
    and<U = T>(result: Result<U, Err>): Result<U, Err>;
    /**
     * Returns result if the result is `Err`, otherwise returns the `Ok` value.
     *
     * This function can be used for control flow based on `Result` values.
     * # Example
     * ```ts
     * Ok<number, number>(3).or(Ok(6)) // Ok(3)
     * Ok<number, number>(3).or(Err("err")) // Err(3)
     * Err<number, number>(3).or(Ok(6)) // Ok(6)
     * Err<number, number>(3).or(Err("err")) // Err("err")
     * ```
     */
    or<U = Err>(result: Result<T, U>): Result<T, U>;
    /**
     * Converts from `Result<T, E>` to `Option<T>` discarding the error, if any.
     *
     * # Example
     * ```ts
     * Ok(3).ok() // Some(3)
     * Err(3).ok() // None()
     * ```
     */
    ok(): Option<T>;
    /**
     * Converts from `Result<T, E>` to `Option<T>` discarding the error, if any.
     *
     * # Example
     * ```ts
     * Ok(3).err() // None()
     * Err(3).err() // Some(3)
     * ```
     */
    err(): Option<Err>;
}
//# sourceMappingURL=interfaces.d.ts.map
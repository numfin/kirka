import type { Result } from "../result/interfaces.js";
export interface Some<T> {
    type: "Some";
    value: T;
}
export interface None {
    type: "None";
}
export type OptionUnion<T> = None | Some<T>;
export interface Option<T> {
    /**
     * Extract internals as union. Useful when you want to handle option yourself
     * # Example
     * ```ts
     * const option = Some(3).inner();
     * if (option.type === "Some") {
     *   option.value // number
     * }
     * ```
     */
    inner(): OptionUnion<T>;
    /**
     * Compare two `Option`'s to each other
     * # Example
     * ```ts
     * Some(3).eq(Some(3)) // true
     * Some(3).eq(Some(4)) // false
     * Some(3).eq(None()) // false
     * ```
     */
    eq<U>(v: Option<T>, by?: (item: T) => U): boolean;
    /**
     * Just a simple data formatter
     * # Example
     * ```ts
     * Some(3).format() // `Some(3)`
     *
     * // or if you want to format your value yourself
     * Some({ x: 3 }).format((v) => JSON.stringify(v.inner().value, null, 2))
     * ```
     */
    format(formatter?: (result: Option<T>) => string): string;
    /** Clone option internal state
     * # Example
     * ```ts
     * // Imagine we mutating Option's inner state
     * const maybeString = Some("data"); // Some("data")
     * const takenString = maybeString.take(); // Some("data")
     * maybeString.isNone() // true
     * // In order to save maybeString inner state we have to clone it
     * const maybeString = Some("data"); // Some("data")
     * const takenString = maybeString.clone().take(); // Some("data")
     * maybeString.isSome() // true
     * ```
     */
    clone(): Option<T>;
    /**
     * Returns the contained `Some` value. It is preferred to use other methods rather than using `unwrap`
     *
     * But it's usefull for quick prototyping or when you know type inside
     *
     * # Throws
     * When value is `None`
     * # Example
     * ```ts
     * Some(3).unwrap() // 3
     * None().unwrap() // throw Error
     * ```
     */
    unwrap(): T;
    /**
     * Returns the contained `Some` or default value
     * # Example
     * ```ts
     * Some(3).unwrapOr(4) // 3
     * None().unwrapOr(4) // 4
     * ```
     */
    unwrapOr(v: T): T;
    /**
     * Returns `true` if value is `None`
     * # Example
     * ```ts
     * Some(3).isNone() // false
     * None().isNone() // true
     * ```
     */
    isNone(): boolean;
    /**
     * Returns `true` if value is `Some`
     * # Example
     * ```ts
     * Some(3).isSome() // true
     * None().isSome() // false
     * ```
     */
    isSome(): boolean;
    /**
     * Takes the value out of the option, leaving a `None` in its place.
     *
     * # Example
     * ```ts
     * const maybeString = Some("data"); // Some("data")
     * const takenString = maybeString.take(); // Some("data")
     * maybeString.isNone() // true
     * ```
     */
    take(): Option<T>;
    /**
     * Returns `true` if value `Some` and predicate `fn` returns `true`.
     *
     * # Example
     * ```ts
     * Some(3).isSomeAnd(v => v === 3) // true
     * Some(3).isSomeAnd(v => v === 4) // false
     * None().isSomeAnd(v => true) // false
     * ```
     */
    isSomeAnd(fn: (v: T) => boolean): boolean;
    /**
     * Returns `true` if value `Some` and predicate `fn` returns `true`.
     *
     * # Example
     * ```ts
     * Some(3).isNoneAnd(v => true) // false
     * None().isNoneAnd(v => true) // true
     * None().isNoneAnd(v => false) // false
     * ```
     */
    isNoneAnd(fn: () => boolean): boolean;
    /**
     * Changes contained value if `Some` by applying `fn` to previous `Some`.
     *
     * # Example
     * ```ts
     * Some(3).map(v => "value") // Some("value")
     * None().map(v => "value") // None()
     * ```
     */
    map<U>(fn: (v: T) => U): Option<U>;
    /**
     * Returns `option` if the result is `None`, otherwise returns the `Some` value.
     *
     * This function can be used for control flow based on `Option` values.
     * # Example
     * ```ts
     * Some(3).or(Some(6)) // Some(3)
     * None().or(Some(6)) // Some(6)
     * None().or(None()) // None()
     * ```
     */
    or(option: Option<T>): Option<T>;
    /**
     * Calls `fn` if the result is `None`, otherwise returns the `Some` value.
     *
     * This function can be used for control flow based on `Option` values.
     * # Example
     * ```ts
     * Some(3).orElse(() => Some(6)) // Some(3)
     * None().orElse(() => Some(6)) // Some(6)
     * None().orElse(() => None()) // None()
     * ```
     */
    orElse(fn: () => Option<T>): Option<T>;
    /**
     * Returns `option` if the result is `Some`, otherwise returns the `None`.
     *
     * This function can be used for control flow based on `Option` values.
     * # Example
     * ```ts
     * Some(3).and(Some(6)) // Some(6)
     * Some(3).and(None()) // None()
     * None().and(Some(6)) // None()
     * ```
     */
    and<U>(v: Option<U>): Option<U>;
    /**
     * Calls `fn` if the result is `Some`, otherwise returns the `None`.
     *
     * This function can be used for control flow based on `Option` values.
     * # Example
     * ```ts
     * Some(3).andThen(() => Some(6)) // Some(6)
     * Some(3).andThen(() => None()) // None()
     * None().andThen(() => Some(6)) // None()
     * ```
     */
    andThen<U>(fn: (v: T) => Option<U>): Option<U>;
    /**
     * Convert `Option<T>` to `Result<T, E>` with provided default `Err` if value is `None`
     * # Example
     * ```ts
     * const withString = Some("data");
     * const withoutString = None<string>();
     *
     * withString.result(() => "Not a string!") // Ok("data")
     * withoutString.result(() => "Not a string!") // Err("Not a string!")
     * ```
     */
    result<E>(noneErr: () => E): Result<T, E>;
    /**
     * Returns `None` if the option is `None`, otherwise calls predicate with the wrapped value and returns:
     *
     * - `Some(t)` if predicate returns `true` (where `t` is the wrapped value)
     * - `None` if predicate returns `false`.
     *
     * This function works similar to `Iter.filter()`. You can imagine the `Option<T>` being an iterator over one or zero elements. `filter()` lets you decide which elements to keep.
     *
     * # Example
     * ```ts
     * const data = Some("coolvalue");
     * const CoolData = data.filter(v => v.includes("cool"))
     * assert(CoolData, Some("coolvalue"))
     * const boringData = data.filter(v => v.includes("boring"))
     * assert(boringData, None())
     * ```
     */
    filter(fn: (item: T) => boolean): Option<T>;
}
//# sourceMappingURL=interfaces.d.ts.map
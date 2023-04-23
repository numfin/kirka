import { AnyHow } from "../anyhow/index.js";
import { Result } from "../index.js";
export interface SchemaError extends AnyHow {
}
export interface Schema<T> {
    /**
     * # Description
     * Convert any value to a schema type.
     * # Example
     * ```ts
     * const s = Schema.num();
     * const v: Result<number> = s.parse(...);
     * ```
     */
    parse(v: unknown): Result<T, SchemaError>;
    /**
     * # Description
     * Test any value for schema type.
     * # Warning
     * Do not rely on `.check(v)` if you need to use `T` of schema.
     * For example if your schema contains `Renum`, the `v` itself does not.
     * If you need to use `v` better to use `.parse()`
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   field: Schema.num()
     * });
     * // valid usage
     * if s.check(...) {
     *   // do some work
     * }
     * // dangerous usage
     * const v = ...;
     * if s.check(v) {
     *    someFn(v.field)
     * }
     * // Instead try to do this
     * const v = ...;
     * s.parse(v).inspect((v) => someFn(v.field))
     * ```
     */
    check(v: unknown): v is T;
}
/**
 * # Description
 * Function for transforming underlying `T`.
 *
 * Returns an `Api` where it's used from.
 *
 * Usefull when creating your own type.
 * # Example
 * ```ts
 * interface SchemaNum<P = number> extends Schema<P> {
 *   transform: Transformer<number, SchemaNum<P>>
 * }
 * ```
 */
export interface Transformer<T, Api> {
    (transformFn: (v: T) => Result<T, SchemaError>): Api;
}
/**
 * # Description
 * Function for checking underlying `T`.
 *
 * Returns an `Api` where it's used from.
 *
 * Usefull when creating your own type.
 * # Example
 * ```ts
 * interface SchemaNum<P = number> extends Schema<P> {
 *   is: Checker<number, SchemaNum<P>>
 * }
 * ```
 */
export interface Checker<T, Api> {
    (checkFn: (v: T) => boolean): Api;
}
/**
 * # Description
 * Helper type for extracting schema type
 *
 * # Example
 * ```ts
 * const s = Schema.num().optional();
 * type S = FromSchema<typeof s>; // Option<number>
 * ```
 */
export type FromSchema<V> = V extends Schema<infer T> ? T : never;
//# sourceMappingURL=interface.d.ts.map
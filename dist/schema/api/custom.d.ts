import { Option, Result } from "../../index.js";
import { Pipe } from "../../pipe/index.js";
import { Checker, Transformer, Schema, SchemaError } from "../interface.js";
export interface SchemaCustom<T, ParsedType = T> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.custom<T>(...).optional();
     * const v: Option<T> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaCustom<T, Option<T>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.custom<T>(...)
     *   .is((v: T) => condition)
     * ```
     */
    is: Checker<T, SchemaCustom<T, ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.custom<T>(...)
     *   .transform((v: T) => {
     *     if (condition) {
     *       return Ok(x as T)
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<T, SchemaCustom<T, ParsedType>>;
}
export declare function SchemaCustom<T, ParsedType = T>(createFn: (v: unknown) => Result<T, SchemaError>, flags?: {
    isOptional: boolean;
}, rules?: ((v: T) => boolean)[], transforms?: Pipe<Result<T, SchemaError>, Result<T, SchemaError>>): SchemaCustom<T, ParsedType>;
//# sourceMappingURL=custom.d.ts.map
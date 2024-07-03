import { NewOption } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaBool<T extends boolean, ParsedType = T> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.bool().optional();
     * const v: Option<boolean> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaBool<T, NewOption<T>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.bool().is((v) => v === true)
     * ```
     */
    is: Checker<T, SchemaBool<T, ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.bool()
     *   .transform((v: T) => {
     *     if (condition) {
     *       return Ok(!v)
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<T, SchemaBool<T, ParsedType>>;
}
export declare const SchemaBool: <T extends boolean>(equalTo?: T) => SchemaBool<T, T>;
//# sourceMappingURL=bool.d.ts.map
import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaBool<ParsedType = boolean> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.bool().optional();
     * const v: Option<boolean> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaBool<Option<boolean>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.bool().is((v) => v === true)
     * ```
     */
    is: Checker<boolean, SchemaBool<ParsedType>>;
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
    transform: Transformer<boolean, SchemaBool<ParsedType>>;
}
export declare function SchemaBool<ParsedType = boolean>(vahter?: SchemaBool<ParsedType>): SchemaBool<ParsedType>;
//# sourceMappingURL=bool.d.ts.map
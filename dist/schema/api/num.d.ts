import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
export interface SchemaNum<ParsedType = number> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.num().optional();
     * const v: Option<number> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaNum<Option<number>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.num().is((v) => v > 5)
     * ```
     */
    is: Checker<number, SchemaNum<ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.num()
     *   .transform((v: T) => {
     *     if (condition) {
     *       return Ok(v * 2)
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<number, SchemaNum<ParsedType>>;
}
export declare function SchemaNum<ParsedType = number>(vahter?: SchemaCustom<number, ParsedType>): SchemaNum<ParsedType>;
//# sourceMappingURL=num.d.ts.map
import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaNum<T extends number, ParsedType = T> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.num().optional();
     * const v: Option<number> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaNum<T, Option<T>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.num().is((v) => v > 5)
     * ```
     */
    is: Checker<T, SchemaNum<T, ParsedType>>;
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
    transform: Transformer<T, SchemaNum<T, ParsedType>>;
}
export declare const SchemaNum: <T extends number>(equalTo?: T) => SchemaNum<T, T>;
//# sourceMappingURL=num.d.ts.map
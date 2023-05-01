import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaArr<T, ParsedType = T[]> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str()).optional();
     * const v: Option<string>[] = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaArr<T, Option<T[]>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str()).is((v) => v.length > 0)
     * ```
     */
    is: Checker<T[], SchemaArr<T, ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str())
     *   .transform((v: T) => {
     *     if (condition) {
     *       v.push("hi")
     *       return Ok(v)
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<T[], SchemaArr<T, ParsedType>>;
}
export declare const SchemaArr: <T>(schema: Schema<T>) => SchemaArr<T, T[]>;
//# sourceMappingURL=arr.d.ts.map
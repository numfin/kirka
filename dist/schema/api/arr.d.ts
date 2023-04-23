import { Option } from "../../index.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
export interface SchemaArr<T extends Schema<unknown>, ParsedType = FromSchema<T>[]> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str()).optional();
     * const v: Option<string>[] = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaArr<T, Option<FromSchema<T>[]>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str()).is((v) => v.length > 0)
     * ```
     */
    is: Checker<FromSchema<T>[], SchemaArr<T, ParsedType>>;
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
    transform: Transformer<FromSchema<T>[], SchemaArr<T, ParsedType>>;
}
export declare function SchemaArr<T extends Schema<unknown>, ParsedType = FromSchema<T>[]>(schema: T, vahter?: SchemaCustom<FromSchema<T>[], ParsedType>): SchemaArr<T, ParsedType>;
//# sourceMappingURL=arr.d.ts.map
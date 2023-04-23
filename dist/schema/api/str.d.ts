import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
export interface SchemaStr<ParsedType = string> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.str().optional();
     * const v: Option<string> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaStr<Option<string>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.str().is((v) => v.length > 0)
     * ```
     */
    is: Checker<string, SchemaStr<ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.str()
     *   .transform((v: T) => {
     *     if (condition) {
     *       return Ok(v + "asd")
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<string, SchemaStr<ParsedType>>;
    /**
     * # Description
     * Set min length of the string.
     * # Example
     * ```ts
     * const s = Schema.str().min(3);
     * s.parse("") // Err()
     * s.parse("asd") // Ok("asd")
     */
    min(len: number): SchemaStr<ParsedType>;
    /**
     * # Description
     * Set max length of the string.
     * # Example
     * ```ts
     * const s = Schema.str().min(2);
     * s.parse("") // Ok("")
     * s.parse("asd") // Err()
     */
    max(len: number): SchemaStr<ParsedType>;
    /**
     * # Description
     * Accept only numeric characters.
     * # Example
     * ```ts
     * const s = Schema.str().numeric();
     * s.parse("") // Ok("")
     * s.parse("0123") // Ok("0123")
     * s.parse("asd0123") // Err()
     */
    numeric(): SchemaStr<ParsedType>;
    /**
     * # Description
     * Accept only alphabetic characters.
     * # Example
     * ```ts
     * const s = Schema.str().numeric();
     * s.parse("asd") // Ok("asd")
     * s.parse("") // Ok("")
     * s.parse("0asd") // Err()
     */
    alphabetic(): SchemaStr<ParsedType>;
    /**
     * # Description
     * Accept only alphanumeric characters.
     * # Example
     * ```ts
     * const s = Schema.str().alphanumeric();
     * s.parse("asd") // Ok("asd")
     * s.parse("asd0") // Ok("asd0")
     * s.parse(" 0asd") // Err()
     */
    alphanumeric(): SchemaStr<ParsedType>;
    /**
     * # Description
     * Validate with your own regex.
     * # Example
     * ```ts
     * const s = Schema.str().re(() => /asd/g);
     * s.parse("asd") // Ok("asd")
     * s.parse("asd0") // Ok("asd0")
     * s.parse("") // Err()
     */
    re(re: () => RegExp, 
    /** Name of the regex rule */ kind?: string): SchemaStr<ParsedType>;
}
export declare function SchemaStr<ParsedType = string>(vahter?: SchemaCustom<string, ParsedType>): SchemaStr<ParsedType>;
//# sourceMappingURL=str.d.ts.map
import { Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaStr<T extends string, ParsedType = T> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.str().optional();
     * const v: Option<string> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaStr<T, Option<T>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.str().is((v) => v.length > 0)
     * ```
     */
    is: Checker<T, SchemaStr<T, ParsedType>>;
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
    transform: Transformer<T, SchemaStr<T, ParsedType>>;
    /**
     * # Description
     * Set min length of the string.
     * # Example
     * ```ts
     * const s = Schema.str().min(3);
     * s.parse("") // Err()
     * s.parse("asd") // Ok("asd")
     */
    min(len: number): SchemaStr<T, ParsedType>;
    /**
     * # Description
     * Set max length of the string.
     * # Example
     * ```ts
     * const s = Schema.str().min(2);
     * s.parse("") // Ok("")
     * s.parse("asd") // Err()
     */
    max(len: number): SchemaStr<T, ParsedType>;
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
    numeric(): SchemaStr<T, ParsedType>;
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
    alphabetic(): SchemaStr<T, ParsedType>;
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
    alphanumeric(): SchemaStr<T, ParsedType>;
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
    /** Name of the regex rule */ kind?: string): SchemaStr<T, ParsedType>;
}
export declare const SchemaStr: <T extends string>(equalTo?: T) => SchemaStr<T, T>;
//# sourceMappingURL=str.d.ts.map
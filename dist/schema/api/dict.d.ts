import { Option } from "../../index.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
type ExtractDict<S extends Record<PropertyKey, Schema<unknown>>> = {
    [key in keyof S]: FromSchema<S[key]>;
};
export interface SchemaDict<S extends Record<PropertyKey, Schema<unknown>>, ParsedType = ExtractDict<S>> extends Schema<ParsedType> {
    /**
     * # Description
     * Make schema optional. All null/undefined become `Option<T>`
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   a: Schema.str()
     * }).optional();
     * const v: Option<{ a: string }> = s.parse(null).unwrap();
     * ```
     */
    optional(): SchemaDict<S, Option<ExtractDict<S>>>;
    /**
     * # Description
     * Add validation rule to schema
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   a: Schema.str()
     * }).is((v) => v.a.length > 0)
     * ```
     */
    is: Checker<ExtractDict<S>, SchemaDict<S, ParsedType>>;
    /**
     * # Description
     * Add transformation to schema. You cannot change the type of value.
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   a: Schema.str()
     * })
     *   .transform((v: T) => {
     *     if (condition) {
     *       v.a = "hi"
     *       return Ok(v)
     *     } else {
     *       return AnyHow.msg("Unable to transform").toErr<T>()
     *     }
     *   })
     * ```
     */
    transform: Transformer<ExtractDict<S>, SchemaDict<S, ParsedType>>;
}
export declare function SchemaDict<S extends Record<PropertyKey, Schema<unknown>>, ParsedType = ExtractDict<S>>(schema: S, vahter?: SchemaCustom<ExtractDict<S>, ExtractDict<S>>): SchemaDict<S, ExtractDict<S>>;
export {};
//# sourceMappingURL=dict.d.ts.map
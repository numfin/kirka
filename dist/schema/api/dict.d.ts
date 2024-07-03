import { NewOption } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
export interface SchemaDict<S extends Record<PropertyKey, unknown>, ParsedType = S> extends Schema<ParsedType> {
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
    optional(): SchemaDict<S, NewOption<S>>;
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
    is: Checker<S, SchemaDict<S, ParsedType>>;
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
    transform: Transformer<S, SchemaDict<S, ParsedType>>;
}
export type RecordAsSchema<T extends Record<PropertyKey, unknown>> = {
    [key in keyof T]: Schema<T[key]>;
};
export interface DictVahterOptions {
    /**
     * # Description
     * - Remove extra keys of dict
     * - Default: `true`
     *
     * # Example
     * ```ts
     * const schema = Schema.dict<Record<string, string>>({}, { trimExtra: false })
     * const result: Result<Record<string, string>> = schema.parse(...)
     * ```
     */
    trimExtra: boolean;
}
export declare const SchemaDict: <T extends Record<PropertyKey, unknown>>(schema: RecordAsSchema<T>, options?: Partial<DictVahterOptions>) => SchemaDict<T, T>;
//# sourceMappingURL=dict.d.ts.map
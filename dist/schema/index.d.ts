import { SchemaNum } from "./api/num.js";
import { SchemaArr } from "./api/arr.js";
import { SchemaBool } from "./api/bool.js";
import { SchemaCustom } from "./api/custom.js";
import { SchemaDict } from "./api/dict.js";
import { SchemaStr } from "./api/str.js";
import { SchemaUnion } from "./api/union.js";
export declare const Schema: {
    /**
     * # Description
     * Number type
     *
     * # Example
     * ```ts
     * const s = Schema.num()
     *   .optional()
     *   .is((v) => v > 0)
     *   .transform((v) => Ok(v * 2))
     * ```
     */
    num: <T extends number>(equalTo?: T | undefined) => SchemaNum<T, T>;
    /**
     * # Description
     * Number type
     *
     * # Example
     * ```ts
     * const s = Schema.str()
     *   .optional()
     *   .is((v) => v.length > 0)
     *   .transform((v) => Ok(v + "asd"))
     * ```
     */
    str: <T_1 extends string>(equalTo?: T_1 | undefined) => SchemaStr<T_1, T_1>;
    /**
     * # Description
     * Boolean type
     *
     * # Example
     * ```ts
     * const s = Schema.bool()
     *   .optional()
     *   .is((v) => v === true)
     *   .transform((v) => Ok(!v))
     * ```
     */
    bool: <T_2 extends boolean>(equalTo?: T_2 | undefined) => SchemaBool<T_2, T_2>;
    /**
     * # Description
     * Boilerplate for your own type. Contains transformation and validation functionality.
     *
     * # Example
     * ```ts
     * const cs = Schema.custom<T>((v: unknown) => {
     *   if (condition) {
     *      return Ok(x as T)
     *   } else {
     *      return AnyHow.expect("Expected T", typeof v).toErr()
     *   }
     * })
     *   .optional()
     *   .is((v: T) => true)
     *   .transform((v: T) => Ok(v))
     * ```
     */
    custom: typeof SchemaCustom;
    /**
     * # Description
     * "Object" type
     *
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   str: Schema.str(),
     *   num: Schema.num(),
     *   bool: Schema.bool()
     * }, { ...options })
     *   .optional()
     *   .is((v) => v.str.length > 0)
     *   .transform((v) => {
     *     v.num *= 2;
     *     return Ok(v)
     *   })
     * ```
     */
    dict: <T_3 extends Record<PropertyKey, unknown>>(schema: import("./api/dict.js").RecordAsSchema<T_3>, options?: Partial<import("./api/dict.js").DictVahterOptions> | undefined) => SchemaDict<T_3, T_3>;
    /**
     * # Description
     * Helper over `Schema.dict` to define `Record<K, T>` object
     *
     * # Example
     * ```ts
     * const s = Schema.record(Schema.str(), Schema.num())
     *   .optional()
     *   .is((v) => Object.keys(v).length > 0)
     *   .transform((v) => {
     *     v.a *= 2;
     *     return Ok(v)
     *   });
     * const value: Record<string, Option<number>> = s.parse({a: 3}).unwrap();
     *
     * ```
     */
    record: <Key extends PropertyKey, Value>(keySchema: import("./interface.js").Schema<Key>, valueSchema: import("./interface.js").Schema<Value>) => SchemaDict<Record<Key, Value>, Record<Key, Value>>;
    /**
     * # Description
     * Array type
     *
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str())
     *   .optional()
     *   .is((v) => v.length > 0)
     *   .transform((v) => {
     *     v.push("another")
     *     return Ok(v)
     *   })
     * ```
     */
    arr: <T_4>(schema: import("./interface.js").Schema<T_4>) => SchemaArr<T_4, T_4[]>;
    /**
     * # Description
     * Tagged union. Used to describe different variants of type
     *
     * # Example
     * ```ts
     * // Parse unknown value to union
     * const innerUnion = Schema.union({
     *   v3v1: Schema.arr(Schema.num()),
     *   v3v2: Schema.str()
     * });
     * const tUnion = Schema.union({
     *   v1: Schema.num(),
     *   v2: Schema.str(),
     *   v3: innerUnion
     * });
     * const parsedValue: UnionInstance<...> = tUnion.parse(...);
     * // Or create union instance yourself
     * const v1 = tUnion.v1(10);
     * const v2 = tUnion.v2("hi");
     * const v3v1 = tUnion.v3(innerUnion.v3v1([42]));
     * const v3v2 = tUnion.v3(innerUnion.v3v2("qwerty"));
     *
     * const v = v1.match({
     *   v1: (v) => 1, // all returns must have same type
     *   v2: (v) => 2,
     *   v3: (v) => 3,
     * }); // 1
     * const v = v2.matchSome({
     *   v2: (v) => 2
     * }); // Some(2)
     *
     * const isV3 = v3.is("v3") // true
     * ```
     */
    union: <T_5 extends Record<PropertyKey, unknown>>(schema: import("./api/dict.js").RecordAsSchema<T_5>) => import("./api/union.js").UnionVariants<T_5> & SchemaUnion<T_5, import("./api/union.js").UnionInstance<T_5>>;
};
//# sourceMappingURL=index.d.ts.map
import { Option } from "../../index.js";
import { Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
export type Matcher<T extends Record<PropertyKey, Schema<unknown>>, U> = {
    [key in keyof T]: (v: FromSchema<T[key]>) => U;
};
export interface UnionInstance<T extends Record<PropertyKey, Schema<unknown>>> {
    /**
     * # Description
     * Extract inner value and use it. All functions must return the same type
     *
     * # Example
     * ```ts
     * const tUnion = Schema.union({
     *   v1: Schema.num(),
     *   v2: Schema.str(),
     * });
     * const v1 = tUnion.v1(10);
     * const v2 = tUnion.v2("hi");
     *
     * const v = v1.match({
     *   v1: (v) => 1, // all returns must have same type
     *   v2: (v) => 2,
     * }); // 1
     * ```
     */
    match<U>(
    /** Set pattern matcher for this key */
    matcher: Matcher<T, U>): U;
    /**
     * # Description
     * Extract inner value and use it. All functions must return the same type.
     * Unlike `.match(...)` this function don't need all variants
     *
     * # Example
     * ```ts
     * const tUnion = Schema.union({
     *   v1: Schema.num(),
     *   v2: Schema.str(),
     * });
     * const v1 = tUnion.v1(10);
     * const v2 = tUnion.v2("hi");
     *
     * const v = v1.matchSome({
     *   v2: (v) => 2
     * }); // None
     * const v = v2.matchSome({
     *   v2: (v) => 2
     * }); // Some(2)
     * ```
     */
    matchSome<U>(matcher: Partial<Matcher<T, U>>): Option<U>;
    /**
     * # Description
     * Check union tag
     *
     * # Example
     * ```ts
     * const tUnion = Schema.union({
     *   v1: Schema.num(),
     *   v2: Schema.str(),
     * });
     * const v1 = tUnion.v1(10);
     *
     * const isV1 = v1.is("v1") // true
     * const isV2 = v1.is("v2") // false
     * ```
     */
    is<K extends keyof T>(tag: K, cond?: (value: FromSchema<T[K]>) => boolean): boolean;
}
export type UnionVariants<T extends Record<PropertyKey, Schema<unknown>>> = {
    [key in keyof T]: (v: FromSchema<T[key]>) => UnionInstance<T>;
};
export declare function Union<T extends Record<PropertyKey, Schema<unknown>>>(_unionSchemas: T): UnionVariants<T>;
export declare function UnionInstance<T extends Record<PropertyKey, Schema<unknown>>>(currentTag: keyof T, value: FromSchema<T[typeof currentTag]>): UnionInstance<T>;
export interface SchemaUnion<S extends Record<PropertyKey, Schema<unknown>>, ParsedType = UnionInstance<S>> extends Schema<ParsedType> {
}
export declare function SchemaUnion<S extends Record<PropertyKey, Schema<unknown>>, ParsedType = UnionInstance<S>>(schema: S, vahter?: SchemaCustom<UnionInstance<S>, ParsedType>): UnionVariants<S> & SchemaUnion<S, ParsedType>;
//# sourceMappingURL=union.d.ts.map
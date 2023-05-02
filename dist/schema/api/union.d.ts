import { Option } from "../../index.js";
import { Schema } from "../interface.js";
import { RecordAsSchema } from "./dict.js";
export type Matcher<T extends Record<PropertyKey, unknown>, U> = {
    [key in keyof T]: (v: T[key]) => U;
};
export interface UnionInstance<T extends Record<PropertyKey, unknown>> {
    _tag: keyof T;
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
    is(tag: keyof T, cond?: (value: T[typeof tag]) => boolean): boolean;
}
export type UnionVariants<T extends Record<PropertyKey, unknown>> = {
    [key in keyof T]: (v: T[key]) => UnionInstance<T>;
};
export declare function Union<T extends Record<PropertyKey, unknown>>(_unionSchemas: T): UnionVariants<T>;
export declare function UnionInstance<T extends Record<PropertyKey, unknown>>(currentTag: keyof T, value: T[typeof currentTag]): UnionInstance<T>;
export interface SchemaUnion<T extends Record<PropertyKey, unknown>, ParsedType = UnionInstance<T>> extends Schema<ParsedType> {
    optional(): SchemaUnion<T, Option<UnionInstance<T>>>;
}
export declare const SchemaUnion: <T extends Record<PropertyKey, unknown>>(schema: RecordAsSchema<T>) => UnionVariants<T> & SchemaUnion<T, UnionInstance<T>>;
//# sourceMappingURL=union.d.ts.map
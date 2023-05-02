import { AnyHow } from "../../anyhow/index.js";
import { None, Ok, Option, Some } from "../../index.js";
import { Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";
import { RecordAsSchema } from "./dict.js";

// export type UnionSchemaDeclaration = Record<PropertyKey, Schema<unknown>>;

export type Matcher<T extends Record<PropertyKey, unknown>, U> = {
  [key in keyof T]: (v: T[key]) => U;
};

export interface UnionInstance<T extends Record<PropertyKey, unknown>> {
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
    matcher: Matcher<T, U>
  ): U;
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

export function Union<T extends Record<PropertyKey, unknown>>(
  _unionSchemas: T
) {
  return new Proxy(
    {},
    {
      get(_, tag) {
        return (v: T[keyof T]) => UnionInstance(tag, v);
      },
    }
  ) as UnionVariants<T>;
}

export function UnionInstance<T extends Record<PropertyKey, unknown>>(
  currentTag: keyof T,
  value: T[typeof currentTag]
) {
  const api: UnionInstance<T> = {
    is(tag, cond) {
      const condition = cond ?? (() => true);
      return tag === currentTag && condition(value);
    },
    matchSome(matcher) {
      if (matcher.hasOwnProperty(currentTag)) {
        const fn = matcher[currentTag];
        if (typeof fn === "function") {
          return Some(fn(value));
        }
      }
      return None();
    },
    match(matcher) {
      return api.matchSome(matcher).unwrap();
    },
  };
  return api;
}

export interface SchemaUnion<
  T extends Record<PropertyKey, unknown>,
  ParsedType = UnionInstance<T>
> extends Schema<ParsedType> {
  optional(): SchemaUnion<T, Option<UnionInstance<T>>>;
}

function defaultVahter<T extends Record<PropertyKey, unknown>>(
  unionSchemas: RecordAsSchema<T>
) {
  return SchemaCustom<UnionInstance<T>>((v) => {
    for (const [tag, tagSchema] of Object.entries(unionSchemas)) {
      const result = (tagSchema as Schema<T[typeof tag]>).parse(v).inner();
      if (result.type === "Ok") {
        return Ok(UnionInstance(tag, result.value));
      }
    }
    const variants = Object.keys(unionSchemas);
    return AnyHow.expect(`Union of [${variants}]`, String(v)).toErr();
  });
}

function SchemaUnionInternal<
  T extends Record<PropertyKey, unknown>,
  ParsedType = UnionInstance<T>
>(
  schema: RecordAsSchema<T>,
  vahter: SchemaCustom<UnionInstance<T>, ParsedType>
) {
  const api: SchemaUnion<T, ParsedType> = {
    optional() {
      return vahter.optional();
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
  };
  return new Proxy(
    {},
    {
      get(_, tag) {
        if (schema.hasOwnProperty(tag)) {
          return (v: T[keyof T]) => UnionInstance(tag, v);
        }
        return api[tag as keyof typeof api];
      },
    }
  ) as UnionVariants<T> & SchemaUnion<T, ParsedType>;
}

export const SchemaUnion = <T extends Record<PropertyKey, unknown>>(
  schema: RecordAsSchema<T>
) => SchemaUnionInternal(schema, defaultVahter(schema));

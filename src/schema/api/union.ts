import { AnyHow } from "../../anyhow/index.js";
import { IterFrom, None, Option, Some } from "../../index.js";
import { Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export type UnionSchemaDeclaration = Record<PropertyKey, Schema<unknown>>;

export type Matcher<T extends UnionSchemaDeclaration, U> = {
  [key in keyof T]: (v: FromSchema<T[key]>) => U;
};

export interface UnionInstance<T extends UnionSchemaDeclaration> {
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
  is<K extends keyof T>(
    tag: K,
    cond?: (value: FromSchema<T[K]>) => boolean
  ): boolean;
}

export type UnionVariants<T extends UnionSchemaDeclaration> = {
  [key in keyof T]: (v: FromSchema<T[key]>) => UnionInstance<T>;
};

export function Union<T extends UnionSchemaDeclaration>(_unionSchemas: T) {
  return new Proxy(
    {},
    {
      get(_, tag) {
        return (v: FromSchema<T[keyof T]>) => UnionInstance<T>(tag, v);
      },
    }
  ) as UnionVariants<T>;
}

export function UnionInstance<T extends UnionSchemaDeclaration>(
  currentTag: keyof T,
  value: FromSchema<T[typeof currentTag]>
): UnionInstance<T> {
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
  S extends UnionSchemaDeclaration,
  ParsedType = UnionInstance<S>
> extends Schema<ParsedType> {
  optional(): SchemaUnion<S, Option<UnionInstance<S>>>;
}

function defaultVahter<S extends UnionSchemaDeclaration>(unionSchemas: S) {
  return SchemaCustom((v) => {
    return IterFrom.array(Object.entries(unionSchemas))
      .findMap(([tag, schema]) =>
        schema
          .parse(v)
          .map((parsedValue) =>
            UnionInstance<S>(tag, parsedValue as FromSchema<S[keyof S]>)
          )
          .ok()
      )
      .result(() => AnyHow.expect("renum", String(v)));
  });
}

function SchemaUnionInternal<ParsedType, S extends UnionSchemaDeclaration>(
  schema: S,
  vahter = defaultVahter(schema) as unknown as SchemaCustom<
    UnionInstance<S>,
    ParsedType
  >
) {
  const api: SchemaUnion<S, ParsedType> = {
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
          return (v: FromSchema<S[keyof S]>) => UnionInstance<S>(tag, v);
        }
        return api[tag as keyof typeof api];
      },
    }
  ) as UnionVariants<S> & SchemaUnion<S, ParsedType>;
}

export const SchemaUnion = <S extends UnionSchemaDeclaration>(schema: S) =>
  SchemaUnionInternal<UnionInstance<S>, S>(schema);

import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

type ExtractDict<S extends Record<PropertyKey, Schema<unknown>>> = {
  [key in keyof S]: FromSchema<S[key]>;
};

export interface SchemaDict<
  S extends Record<PropertyKey, unknown>,
  ParsedType = S
> extends Schema<ParsedType> {
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
  optional(): SchemaDict<S, Option<S>>;
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

type DictSchema<T extends Record<PropertyKey, unknown>> = {
  [key in keyof T]: Schema<T[key]>;
};

function defaultVahter<T extends Record<PropertyKey, unknown>>(
  schema: DictSchema<T>
): SchemaCustom<T> {
  return SchemaCustom((v) => {
    if (typeof v !== "object") {
      return AnyHow.expect("object", typeof v).toErr<T>();
    } else if (v === null) {
      return AnyHow.expect("object", "null").toErr<T>();
    } else if (Array.isArray(v)) {
      return AnyHow.expect("object", v).toErr<T>();
    }
    const parsedObj = {} as T;

    for (const [prop, propSchema] of Object.entries(schema)) {
      const result = (propSchema as Schema<T>).parse(v[prop as keyof typeof v]);
      if (result.isOk()) {
        parsedObj[prop as keyof T] = result.unwrap() as T[keyof T];
      } else {
        return result
          .unwrapErr()
          .wrapWith(() => `Field: ${prop}`)
          .toErr<T>();
      }
    }
    return Ok(parsedObj);
  });
}

function SchemaDictInternal<
  T extends Record<PropertyKey, unknown>,
  ParsedType = T
>(vahter: SchemaCustom<T, ParsedType>) {
  const api = {
    optional() {
      return SchemaDictInternal<T, Option<T>>(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaDictInternal(vahter.is(fn));
    },
    transform(fn) {
      return SchemaDictInternal(vahter.transform(fn));
    },
  } as SchemaDict<T, ParsedType>;
  return api;
}
export const SchemaDict = <T extends Record<PropertyKey, unknown>>(
  schema: DictSchema<T>
) => SchemaDictInternal(defaultVahter(schema));

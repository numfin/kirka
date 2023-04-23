import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

type ExtractDict<S extends Record<PropertyKey, Schema<unknown>>> = {
  [key in keyof S]: FromSchema<S[key]>;
};

export interface SchemaDict<
  S extends Record<PropertyKey, Schema<unknown>>,
  ParsedType = ExtractDict<S>
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

function defaultVahter<S extends Record<PropertyKey, Schema<unknown>>>(
  schema: S
) {
  return SchemaCustom((v) => {
    type Return = ExtractDict<S>;
    if (typeof v !== "object") {
      return AnyHow.expect("object", typeof v).toErr<Return>();
    } else if (v === null) {
      return AnyHow.expect("object", "null").toErr<Return>();
    } else if (Array.isArray(v)) {
      return AnyHow.expect("object", v).toErr<Return>();
    }
    const parsedObj = {} as Return;

    for (const [prop, propSchema] of Object.entries(schema)) {
      const result = propSchema.parse(v[prop as keyof typeof v]);
      if (result.isOk()) {
        type schemaKey = keyof Return;
        parsedObj[prop as schemaKey] = result.unwrap() as Return[schemaKey];
      } else {
        return result
          .unwrapErr()
          .wrapWith(() => `Field: ${prop}`)
          .toErr<Return>();
      }
    }
    return Ok(parsedObj);
  });
}

export function SchemaDict<
  S extends Record<PropertyKey, Schema<unknown>>,
  ParsedType = ExtractDict<S>
>(schema: S, vahter = defaultVahter(schema)) {
  const api = {
    optional() {
      return SchemaDict(
        schema,
        vahter.optional() as SchemaCustom<ExtractDict<S>>
      );
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaDict(schema, vahter.is(fn));
    },
    transform(fn) {
      return SchemaDict(schema, vahter.transform(fn));
    },
  } as SchemaDict<S, ExtractDict<S>>;
  return api;
}

import { AnyHow } from "../../anyhow/index.js";
import { NewOption, Ok } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

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
function defaultVahter<T extends Record<PropertyKey, unknown>>(
  schema: RecordAsSchema<T>,
  options: DictVahterOptions
): SchemaCustom<T> {
  return SchemaCustom((v) => {
    if (typeof v !== "object") {
      return AnyHow.expect("object", typeof v).toErr<T>();
    } else if (v === null) {
      return AnyHow.expect("object", "null").toErr<T>();
    } else if (Array.isArray(v)) {
      return AnyHow.expect("object", v).toErr<T>();
    }
    const parsedObj = (options.trimExtra ? {} : v) as T;

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
  const api: SchemaDict<T, ParsedType> = {
    optional() {
      return SchemaDictInternal<T, NewOption<T>>(vahter.optional());
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
  };
  return api;
}
export const SchemaDict = <T extends Record<PropertyKey, unknown>>(
  schema: RecordAsSchema<T>,
  options?: Partial<DictVahterOptions>
) =>
  SchemaDictInternal(
    defaultVahter(schema, {
      trimExtra: options?.trimExtra ?? true,
    })
  );

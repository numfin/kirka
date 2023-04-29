import { AnyHow } from "../../anyhow/index.js";
import { IterFrom, Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaArr<
  T extends Schema<unknown>,
  ParsedType = FromSchema<T>[]
> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.arr(Schema.str()).optional();
   * const v: Option<string>[] = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaArr<T, Option<FromSchema<T>[]>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.arr(Schema.str()).is((v) => v.length > 0)
   * ```
   */
  is: Checker<FromSchema<T>[], SchemaArr<T, ParsedType>>;
  /**
   * # Description
   * Add transformation to schema. You cannot change the type of value.
   * # Example
   * ```ts
   * const s = Schema.arr(Schema.str())
   *   .transform((v: T) => {
   *     if (condition) {
   *       v.push("hi")
   *       return Ok(v)
   *     } else {
   *       return AnyHow.msg("Unable to transform").toErr<T>()
   *     }
   *   })
   * ```
   */
  transform: Transformer<FromSchema<T>[], SchemaArr<T, ParsedType>>;
}

function defaultVahter<T extends Schema<unknown>>(schema: T) {
  return SchemaCustom((items) => {
    type Return = FromSchema<T>[];
    if (!Array.isArray(items)) {
      return AnyHow.expect("array", String(items)).toErr<Return>();
    }
    const parsedArr: Return = [];

    for (const { index, item } of IterFrom.array(items).enumerate()) {
      const result = schema.parse(item);

      if (result.isOk()) {
        parsedArr.push(result.unwrap() as FromSchema<T>);
      } else {
        return result
          .unwrapErr()
          .wrapWith(() => `Array item#${index}`)
          .toErr<Return>();
      }
    }
    return Ok(parsedArr);
  });
}

export function SchemaArr<
  T extends Schema<unknown>,
  ParsedType = FromSchema<T>[]
>(
  schema: T,
  vahter = defaultVahter(schema) as unknown as SchemaCustom<
    FromSchema<T>[],
    ParsedType
  >
) {
  const api: SchemaArr<T, ParsedType> = {
    optional() {
      return SchemaArr<T, Option<FromSchema<T>[]>>(schema, vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaArr(schema, vahter.is(fn));
    },
    transform(fn) {
      return SchemaArr(schema, vahter.transform(fn));
    },
  };
  return api;
}

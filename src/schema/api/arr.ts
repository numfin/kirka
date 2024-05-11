import { AnyHow } from "../../anyhow/index.js";
import { Iter, Ok, Option } from "../../index.js";
import { enumerate } from "../../iter/api/enumerate.js";
import { Checker, Transformer, Schema, FromSchema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaArr<T, ParsedType = T[]> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.arr(Schema.str()).optional();
   * const v: Option<string>[] = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaArr<T, Option<T[]>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.arr(Schema.str()).is((v) => v.length > 0)
   * ```
   */
  is: Checker<T[], SchemaArr<T, ParsedType>>;
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
  transform: Transformer<T[], SchemaArr<T, ParsedType>>;
}

function defaultVahter<T>(schema: Schema<T>) {
  return SchemaCustom((items) => {
    type Return = T[];
    if (!Array.isArray(items)) {
      return AnyHow.expect("array", String(items)).toErr<Return>();
    }
    const parsedArr: Return = [];

    for (const { index, item } of Iter.from(items).do(enumerate())) {
      const result = schema.parse(item);

      if (result.isOk()) {
        parsedArr.push(result.unwrap());
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

function SchemaArrInternal<T, ParsedType = T[]>(
  vahter: SchemaCustom<T[], ParsedType>
) {
  const api: SchemaArr<T, ParsedType> = {
    optional() {
      return SchemaArrInternal(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaArrInternal(vahter.is(fn));
    },
    transform(fn) {
      return SchemaArrInternal(vahter.transform(fn));
    },
  };
  return api;
}

export const SchemaArr = <T>(schema: Schema<T>) =>
  SchemaArrInternal(defaultVahter(schema));

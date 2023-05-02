import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaNum<T extends number, ParsedType = T>
  extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.num().optional();
   * const v: Option<number> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaNum<T, Option<T>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.num().is((v) => v > 5)
   * ```
   */
  is: Checker<T, SchemaNum<T, ParsedType>>;
  /**
   * # Description
   * Add transformation to schema. You cannot change the type of value.
   * # Example
   * ```ts
   * const s = Schema.num()
   *   .transform((v: T) => {
   *     if (condition) {
   *       return Ok(v * 2)
   *     } else {
   *       return AnyHow.msg("Unable to transform").toErr<T>()
   *     }
   *   })
   * ```
   */
  transform: Transformer<T, SchemaNum<T, ParsedType>>;
}

function defaultVahter<T extends number>(equalTo?: T) {
  return SchemaCustom((v) => {
    if (typeof v !== "number") {
      return AnyHow.expect("number", typeof v).toErr<T>();
    } else if (isNaN(v)) {
      return AnyHow.expect("number", v).toErr<T>();
    } else if (!isFinite(v)) {
      return AnyHow.expect("finite number", v).toErr<T>();
    } else if (typeof equalTo === "number") {
      return v === equalTo ? Ok(v as T) : AnyHow.expect(equalTo, v).toErr<T>();
    } else {
      return Ok(v as T);
    }
  });
}

function SchemaNumInternal<T extends number, ParsedType = T>(
  vahter: SchemaCustom<T, ParsedType>
) {
  const api: SchemaNum<T, ParsedType> = {
    optional() {
      return SchemaNumInternal(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaNumInternal(vahter.is(fn));
    },
    transform(fn) {
      return SchemaNumInternal(vahter.transform(fn));
    },
  };
  return api;
}
export const SchemaNum = <T extends number>(equalTo?: T) =>
  SchemaNumInternal(defaultVahter(equalTo));

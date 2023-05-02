import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaNum<ParsedType = number> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.num().optional();
   * const v: Option<number> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaNum<Option<number>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.num().is((v) => v > 5)
   * ```
   */
  is: Checker<number, SchemaNum<ParsedType>>;
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
  transform: Transformer<number, SchemaNum<ParsedType>>;
}

function defaultVahter() {
  return SchemaCustom((v) => {
    type Return = number;
    if (typeof v !== "number") {
      return AnyHow.expect("number", typeof v).toErr<Return>();
    } else if (isNaN(v)) {
      return AnyHow.expect("number", v).toErr<Return>();
    } else if (!isFinite(v)) {
      return AnyHow.expect("finite number", v).toErr<Return>();
    } else {
      return Ok(v);
    }
  });
}

function SchemaNumInternal<ParsedType = number>(
  vahter: SchemaCustom<number, ParsedType>
) {
  const api: SchemaNum<ParsedType> = {
    optional() {
      return SchemaNumInternal<Option<number>>(vahter.optional());
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
export const SchemaNum = () => SchemaNumInternal(defaultVahter());

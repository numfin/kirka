import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaBool<T extends boolean, ParsedType = T>
  extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.bool().optional();
   * const v: Option<boolean> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaBool<T, Option<T>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.bool().is((v) => v === true)
   * ```
   */
  is: Checker<T, SchemaBool<T, ParsedType>>;
  /**
   * # Description
   * Add transformation to schema. You cannot change the type of value.
   * # Example
   * ```ts
   * const s = Schema.bool()
   *   .transform((v: T) => {
   *     if (condition) {
   *       return Ok(!v)
   *     } else {
   *       return AnyHow.msg("Unable to transform").toErr<T>()
   *     }
   *   })
   * ```
   */
  transform: Transformer<T, SchemaBool<T, ParsedType>>;
}
function defaultVahter<T extends boolean>(equalTo?: T) {
  return SchemaCustom((v) => {
    type Return = T;
    if (typeof v !== "boolean") {
      return AnyHow.expect("boolean", typeof v).toErr<Return>();
    } else if (typeof equalTo === "boolean") {
      return equalTo === v ? Ok(v as T) : AnyHow.expect(equalTo, v).toErr<T>();
    } else {
      return Ok(v as T);
    }
  });
}
function SchemaBoolInternal<T extends boolean, ParsedType = T>(
  vahter: SchemaBool<T, ParsedType>
) {
  const api: SchemaBool<T, ParsedType> = {
    optional() {
      return SchemaBoolInternal(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaBoolInternal(vahter.is(fn));
    },
    transform(fn) {
      return SchemaBoolInternal(vahter.transform(fn));
    },
  };
  return api;
}

export const SchemaBool = <T extends boolean>(equalTo?: T) =>
  SchemaBoolInternal(defaultVahter(equalTo));

import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option, Result } from "../../index.js";
import { Checker, Transformer, Schema, SchemaError } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaBool<ParsedType = boolean> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.bool().optional();
   * const v: Option<boolean> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaBool<Option<boolean>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.bool().is((v) => v === true)
   * ```
   */
  is: Checker<boolean, SchemaBool<ParsedType>>;
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
  transform: Transformer<boolean, SchemaBool<ParsedType>>;
}
function defaultVahter() {
  return SchemaCustom((v) => {
    type Return = boolean;
    if (typeof v !== "boolean") {
      return AnyHow.expect("boolean", typeof v).toErr<Return>();
    } else {
      return Ok(v);
    }
  });
}
export function SchemaBool<ParsedType = boolean>(
  vahter = defaultVahter() as SchemaBool<ParsedType>
) {
  const api: SchemaBool<ParsedType> = {
    optional() {
      return SchemaBool(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaBool(vahter.is(fn));
    },
    transform(fn) {
      return SchemaBool(vahter.transform(fn));
    },
  };
  return api;
}

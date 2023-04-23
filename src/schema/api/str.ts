import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option, OptionFrom, Result } from "../../index.js";
import { Checker, Transformer, Schema, SchemaError } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaStr<ParsedType = string> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.str().optional();
   * const v: Option<string> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaStr<Option<string>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.str().is((v) => v.length > 0)
   * ```
   */
  is: Checker<string, SchemaStr<ParsedType>>;
  /**
   * # Description
   * Add transformation to schema. You cannot change the type of value.
   * # Example
   * ```ts
   * const s = Schema.str()
   *   .transform((v: T) => {
   *     if (condition) {
   *       return Ok(v + "asd")
   *     } else {
   *       return AnyHow.msg("Unable to transform").toErr<T>()
   *     }
   *   })
   * ```
   */
  transform: Transformer<string, SchemaStr<ParsedType>>;
  /**
   * # Description
   * Set min length of the string.
   * # Example
   * ```ts
   * const s = Schema.str().min(3);
   * s.parse("") // Err()
   * s.parse("asd") // Ok("asd")
   */
  min(len: number): SchemaStr<ParsedType>;
  /**
   * # Description
   * Set max length of the string.
   * # Example
   * ```ts
   * const s = Schema.str().min(2);
   * s.parse("") // Ok("")
   * s.parse("asd") // Err()
   */
  max(len: number): SchemaStr<ParsedType>;
  /**
   * # Description
   * Accept only numeric characters.
   * # Example
   * ```ts
   * const s = Schema.str().numeric();
   * s.parse("") // Ok("")
   * s.parse("0123") // Ok("0123")
   * s.parse("asd0123") // Err()
   */
  numeric(): SchemaStr<ParsedType>;
  /**
   * # Description
   * Accept only alphabetic characters.
   * # Example
   * ```ts
   * const s = Schema.str().numeric();
   * s.parse("asd") // Ok("asd")
   * s.parse("") // Ok("")
   * s.parse("0asd") // Err()
   */
  alphabetic(): SchemaStr<ParsedType>;
  /**
   * # Description
   * Accept only alphanumeric characters.
   * # Example
   * ```ts
   * const s = Schema.str().alphanumeric();
   * s.parse("asd") // Ok("asd")
   * s.parse("asd0") // Ok("asd0")
   * s.parse(" 0asd") // Err()
   */
  alphanumeric(): SchemaStr<ParsedType>;
  /**
   * # Description
   * Validate with your own regex.
   * # Example
   * ```ts
   * const s = Schema.str().re(() => /asd/g);
   * s.parse("asd") // Ok("asd")
   * s.parse("asd0") // Ok("asd0")
   * s.parse("") // Err()
   */
  re(
    re: () => RegExp,
    /** Name of the regex rule */ kind?: string
  ): SchemaStr<ParsedType>;
}

function defaultVahter() {
  return SchemaCustom((v) => {
    type Return = string;
    if (typeof v !== "string") {
      return AnyHow.expect("string", typeof v).toErr<Return>();
    } else {
      return Ok(v);
    }
  });
}

export function SchemaStr<ParsedType = string>(
  vahter = defaultVahter() as SchemaCustom<string, ParsedType>
) {
  const api: SchemaStr<ParsedType> = {
    optional() {
      return SchemaStr<Option<string>>(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v) as Result<ParsedType, SchemaError>;
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaStr(vahter.is(fn));
    },
    transform(fn) {
      return SchemaStr(vahter.transform(fn));
    },
    max(len) {
      return SchemaStr(vahter.is((v) => v.length <= len));
    },
    min(len) {
      return SchemaStr(vahter.is((v) => v.length >= len));
    },
    numeric() {
      return api.re(() => /^\d*$/gmu, "numeric string");
    },
    alphabetic() {
      return api.re(() => /^[\p{Letter}\p{Mark}]*$/gmu, "alphabetic string");
    },
    alphanumeric() {
      return api.re(
        () => /^[\p{Letter}\p{Mark}\d]*$/gmu,
        "alphanumeric string"
      );
    },
    re(re: () => RegExp, kind?: string) {
      return SchemaStr(
        vahter.transform((v) => {
          const invokedRe = re();
          return regexp(invokedRe, kind ?? invokedRe.source, v);
        })
      );
    },
  };
  return api;
}

const regexp = (re: RegExp, kind: string, value: string) =>
  OptionFrom.bool(re.test(value))
    .result(() => AnyHow.expect(kind, value))
    .map(() => value)
    .orElse((err) => err.toErr());

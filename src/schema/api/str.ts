import { AnyHow } from "../../anyhow/index.js";
import { Ok, Option, OptionFrom } from "../../index.js";
import { Checker, Transformer, Schema } from "../interface.js";
import { SchemaCustom } from "./custom.js";

export interface SchemaStr<T extends string, ParsedType = T>
  extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.str().optional();
   * const v: Option<string> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaStr<T, Option<T>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.str().is((v) => v.length > 0)
   * ```
   */
  is: Checker<T, SchemaStr<T, ParsedType>>;
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
  transform: Transformer<T, SchemaStr<T, ParsedType>>;
  /**
   * # Description
   * Set min length of the string.
   * # Example
   * ```ts
   * const s = Schema.str().min(3);
   * s.parse("") // Err()
   * s.parse("asd") // Ok("asd")
   */
  min(len: number): SchemaStr<T, ParsedType>;
  /**
   * # Description
   * Set max length of the string.
   * # Example
   * ```ts
   * const s = Schema.str().min(2);
   * s.parse("") // Ok("")
   * s.parse("asd") // Err()
   */
  max(len: number): SchemaStr<T, ParsedType>;
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
  numeric(): SchemaStr<T, ParsedType>;
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
  alphabetic(): SchemaStr<T, ParsedType>;
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
  alphanumeric(): SchemaStr<T, ParsedType>;
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
  ): SchemaStr<T, ParsedType>;
}

function defaultVahter<T extends string>(equalTo?: T) {
  return SchemaCustom((v) => {
    type Return = T;
    if (typeof v !== "string") {
      return AnyHow.expect("string", typeof v).toErr<Return>();
    } else if (typeof equalTo === "string") {
      return v === equalTo ? Ok(v as T) : AnyHow.expect(equalTo, v).toErr<T>();
    } else {
      return Ok(v as T);
    }
  });
}

function SchemaStrInternal<T extends string, ParsedType = T>(
  vahter: SchemaCustom<T, ParsedType>
) {
  const api: SchemaStr<T, ParsedType> = {
    optional() {
      return SchemaStrInternal(vahter.optional());
    },
    parse(v) {
      return vahter.parse(v);
    },
    check(v): v is ParsedType {
      return vahter.check(v);
    },
    is(fn) {
      return SchemaStrInternal(vahter.is(fn));
    },
    transform(fn) {
      return SchemaStrInternal(vahter.transform(fn));
    },
    max(len) {
      return SchemaStrInternal(vahter.is((v) => v.length <= len));
    },
    min(len) {
      return SchemaStrInternal(vahter.is((v) => v.length >= len));
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
      return SchemaStrInternal(
        vahter.transform((v) => {
          const invokedRe = re();
          return regexp(invokedRe, kind ?? invokedRe.source, v);
        })
      );
    },
  };
  return api;
}

const regexp = <T extends string>(re: RegExp, kind: string, value: T) =>
  OptionFrom.bool(re.test(value))
    .result(() => AnyHow.expect(kind, value))
    .map(() => value)
    .orElse((err) => err.toErr());

export const SchemaStr = <T extends string>(equalTo?: T) =>
  SchemaStrInternal(defaultVahter(equalTo));

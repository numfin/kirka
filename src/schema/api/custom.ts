import { AnyHow } from "../../anyhow/index.js";
import {
  IterFrom,
  None,
  Ok,
  Option,
  OptionFrom,
  Result,
  Some,
} from "../../index.js";
import { Pipe } from "../../pipe/index.js";
import { Checker, Transformer, Schema, SchemaError } from "../interface.js";

export interface SchemaCustom<T, ParsedType = T> extends Schema<ParsedType> {
  /**
   * # Description
   * Make schema optional. All null/undefined become `Option<T>`
   * # Example
   * ```ts
   * const s = Schema.custom<T>(...).optional();
   * const v: Option<T> = s.parse(null).unwrap();
   * ```
   */
  optional(): SchemaCustom<T, Option<T>>;
  /**
   * # Description
   * Add validation rule to schema
   * # Example
   * ```ts
   * const s = Schema.custom<T>(...)
   *   .is((v: T) => condition)
   * ```
   */
  is: Checker<T, SchemaCustom<T, ParsedType>>;
  /**
   * # Description
   * Add transformation to schema. You cannot change the type of value.
   * # Example
   * ```ts
   * const s = Schema.custom<T>(...)
   *   .transform((v: T) => {
   *     if (condition) {
   *       return Ok(x as T)
   *     } else {
   *       return AnyHow.msg("Unable to transform").toErr<T>()
   *     }
   *   })
   * ```
   */
  transform: Transformer<T, SchemaCustom<T, ParsedType>>;
}

export function SchemaCustom<T, ParsedType = T>(
  createFn: (v: unknown) => Result<T, SchemaError>,
  flags = { isOptional: false },
  rules = [] as ((v: T) => boolean)[],
  transforms = Pipe((v: Result<T, SchemaError>) => v)
) {
  const validate = (v: T) =>
    IterFrom.array(rules)
      .enumerate()
      .findMap(({ index, item }) => (item(v) ? None() : Some(index)))
      .match(
        (index) => AnyHow.msg(`Rule ${index} failed`).toErr(),
        () => Ok<T, SchemaError>(v)
      );
  const api: SchemaCustom<T, ParsedType> = {
    transform(checkFn) {
      return SchemaCustom(
        createFn,
        flags,
        rules,
        transforms.clone().chain((v) => v.andThen(checkFn))
      );
    },
    is(checkFn) {
      return SchemaCustom(createFn, flags, rules.concat(checkFn), transforms);
    },
    optional() {
      return SchemaCustom(createFn, { isOptional: true }, rules, transforms);
    },
    parse(v) {
      const validateAndTransform = Pipe(createFn)
        .chain((v) => v.andThen(validate))
        .chain(transforms.call);

      if (flags.isOptional) {
        return OptionFrom.nullable(v).match(
          (v) => validateAndTransform.call(v).map(Some),
          () => Ok(None())
        ) as Result<ParsedType, SchemaError>;
      }
      return validateAndTransform.call(v) as unknown as Result<
        ParsedType,
        SchemaError
      >;
    },
    check(v): v is ParsedType {
      return api.parse(v).isOk();
    },
  };
  return api;
}

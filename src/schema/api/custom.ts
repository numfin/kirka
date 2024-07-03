import { AnyHow } from "../../anyhow/index.js";
import { Iter, NewOption, Ok, ResultNew } from "../../index.js";
import { enumerate } from "../../iter/api/enumerate.js";
import { findMap } from "../../iter/api/find_map.js";
import { Pipe } from "../../pipe/index.js";
import { andThen } from "../../result/api/andThen.js";
import { map } from "../../result/api/map.js";
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
  optional(): SchemaCustom<T, NewOption<T>>;
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
  createFn: (v: unknown) => ResultNew<T, SchemaError>,
  flags = { isOptional: false },
  rules = [] as ((v: T) => boolean)[],
  transforms = Pipe((v: ResultNew<T, SchemaError>) => v)
) {
  const validate = (v: T) =>
    Iter.from(rules)
      .do(enumerate())
      .do(
        findMap(({ index, item }) =>
          item(v) ? NewOption.None() : NewOption.Some(index)
        )
      )
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
        transforms.clone().chain((v) => v.do(andThen(checkFn)))
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
        .chain((v) => v.do(andThen(validate)))
        .chain(transforms.call);

      if (flags.isOptional) {
        return NewOption.fromNullable(v).match(
          (v) => validateAndTransform.call(v).do(map(NewOption.Some)),
          () => Ok(NewOption.None())
        ) as ResultNew<ParsedType, SchemaError>;
      }
      return validateAndTransform.call(v) as unknown as ResultNew<
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

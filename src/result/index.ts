export { ResultFrom } from "./from/index.js";
export * from "./interfaces.js";

import { and } from "./api/and.js";
import { or } from "./api/or.js";
import { andThen } from "./api/andThen.js";
import { orElse } from "./api/orElse.js";
import { eq } from "./api/eq.js";
import { format } from "./api/format.js";
import { inspect } from "./api/inspect.js";
import { inspectErr } from "./api/inspectErr.js";
import { isOk } from "./api/isOk.js";
import { isOkAnd } from "./api/isOkAnd.js";
import { isErr } from "./api/isErr.js";
import { isErrAnd } from "./api/isErrAnd.js";
import { map } from "./api/map.js";
import { mapErr } from "./api/mapErr.js";
import { ok } from "./api/ok.js";
import { err } from "./api/err.js";
import { unwrap } from "./api/unwrap.js";
import { uwnrapOr } from "./api/unwrapOr.js";
import { unwrapErr } from "./api/unwrapErr.js";
import { unwrapErrOr } from "./api/unwrapErrOr.js";
import type { Result, ResultUnion, Ok, Err } from "./interfaces.js";
import { unionOk } from "./api/unionOk.js";
import { unionErr } from "./api/unionErr.js";
import { match } from "./api/match.js";

export function createResult<T, E>(result: ResultUnion<T, E>): Result<T, E> {
  const api: Result<T, E> = {
    inner: () => result,
    eq: (other: Result<T, E>) => eq(api, other),
    format: (formatter) => format(api, formatter),
    isOk: () => isOk(result),
    isErr: () => isErr(result),
    unwrap: () => unwrap(api),
    unwrapErr: () => unwrapErr(api),
    unwrapOr: (default_value) => uwnrapOr(api, default_value),
    unwrapErrOr: (default_value) => unwrapErrOr(api, default_value),
    isOkAnd: (fn) => isOkAnd(api, fn),
    isErrAnd: (fn) => isErrAnd(api, fn),
    map: (fn) => createResult(map(result, fn)),
    mapErr: (fn) => createResult(mapErr(result, fn)),
    inspect: (fn) => inspect(api, fn),
    inspectErr: (fn) => inspectErr(api, fn),
    andThen: (fn) => createResult(andThen(api, fn)),
    orElse: (fn) => createResult(orElse(api, fn)),
    and: (new_value) => and(api, new_value),
    or: (new_value) => or(api, new_value),
    ok: () => ok(api),
    err: () => err(api),
    match: (onOk, onErr) => match(result, onOk, onErr),
  };
  return api;
}

export function Ok<T, E>(value: T) {
  return createResult<T, E>(unionOk(value));
}
export function Err<T, E>(value: E) {
  return createResult<T, E>(unionErr(value));
}

/**
 * Wrapps `fn` into `tryCatch` returning result as `Ok<T>` and error as `Err<E>`
 * # Example
 * ```ts
 * tryFn(() => {
 *  throw new Error(`Oh no!`)
 * })
 * .map(data => console.log(data))
 * .or(err => console.log(err))
 * ```
 */
export function tryFn<T, E>(fn: () => T): Result<T, E> {
  try {
    return Ok(fn());
  } catch (err: unknown) {
    return Err(err as E);
  }
}

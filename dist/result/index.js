export { ResultFrom } from "./from";
export * from "./interfaces";
import { and } from "./api/and";
import { or } from "./api/or";
import { andThen } from "./api/andThen";
import { orElse } from "./api/orElse";
import { eq } from "./api/eq";
import { format } from "./api/format";
import { inspect } from "./api/inspect";
import { inspectErr } from "./api/inspectErr";
import { isOk } from "./api/isOk";
import { isOkAnd } from "./api/isOkAnd";
import { isErr } from "./api/isErr";
import { isErrAnd } from "./api/isErrAnd";
import { map } from "./api/map";
import { mapErr } from "./api/mapErr";
import { ok } from "./api/ok";
import { err } from "./api/err";
import { unwrap } from "./api/unwrap";
import { uwnrapOr } from "./api/unwrapOr";
import { unwrapErr } from "./api/unwrapErr";
import { unwrapErrOr } from "./api/unwrapErrOr";
import { unionOk } from "./api/unionOk";
import { unionErr } from "./api/unionErr";
export function createResult(result) {
    const api = {
        inner: () => result,
        eq: (other) => eq(api, other),
        format: () => format(result),
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
    };
    return api;
}
export function Ok(value) {
    return createResult(unionOk(value));
}
export function Err(value) {
    return createResult(unionErr(value));
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
export function tryFn(fn) {
    try {
        return Ok(fn());
    }
    catch (err) {
        return Err(err);
    }
}

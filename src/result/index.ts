import { ResultUnion } from "./base.js";
import { isOk } from "./api/isOk.js";
import { isErr } from "./api/isErr.js";
import { unwrap } from "./api/unwrap.js";
import { ResultPipe } from "./middleware/middleware.js";
import { unwrapErr } from "./api/unwrapErr.js";
import { eq } from "./api/eq.js";
import { unwrapOr } from "./api/unwrapOr.js";
import { unwrapErrOr } from "./api/unwrapErrOr.js";
import { match } from "./api/match.js";

export class ResultNew<T, E> {
  *[Symbol.iterator]() {
    if (isOk(this.inner)) {
      yield this.inner.value;
    }
  }
  constructor(public inner: ResultUnion<T, E>) {}
  static Ok<T, E>(value: T) {
    return new ResultNew<T, E>({ type: "Ok", value });
  }
  static Err<T, E>(err: E) {
    return new ResultNew<T, E>({ type: "Err", err });
  }
  static tryFn<T, E>(fn: () => T) {
    try {
      const result = fn();
      return Ok(result);
    } catch (err) {
      return Err(err as E);
    }
  }
  static async tryAsync<T, E>(fn: () => Promise<T>): Promise<ResultNew<T, E>> {
    try {
      const result = await fn();
      return Ok(result);
    } catch (err) {
      return Err(err as E);
    }
  }

  eq(other: ResultNew<T, E>) {
    return this.do(eq(other));
  }
  isOk() {
    return isOk(this.inner);
  }
  isErr() {
    return isErr(this.inner);
  }
  unwrap() {
    return this.do(unwrap());
  }
  unwrapOr(defaultValue: T) {
    return this.do(unwrapOr(defaultValue));
  }
  unwrapErr() {
    return this.do(unwrapErr());
  }
  unwrapErrOr(defaultErr: E) {
    return this.do(unwrapErrOr(defaultErr));
  }
  match<U>(onOk: (v: T) => U, onErr: (e: E) => U) {
    return this.do(match(onOk, onErr));
  }
  do<Out>(fn: ResultPipe<T, E, Out>) {
    return fn(this, this.inner);
  }
  pipe<Args extends unknown[], Out>(
    fn: (...args: Args) => ResultPipe<T, E, Out>
  ) {
    return (...args: Args) => fn(...args)(this, this.inner);
  }
}

export const Ok = ResultNew.Ok;
export const Err = ResultNew.Err;

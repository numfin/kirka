import { isOk } from "./api/isOk.js";
import { isErr } from "./api/isErr.js";
import { unwrap } from "./api/unwrap.js";
import { unwrapErr } from "./api/unwrapErr.js";
import { eq } from "./api/eq.js";
import { unwrapOr } from "./api/unwrapOr.js";
import { unwrapErrOr } from "./api/unwrapErrOr.js";
import { match } from "./api/match.js";
export class ResultNew {
    inner;
    *[Symbol.iterator]() {
        if (isOk(this.inner)) {
            yield this.inner.value;
        }
    }
    constructor(inner) {
        this.inner = inner;
    }
    static Ok(value) {
        return new ResultNew({ type: "Ok", value });
    }
    static Err(err) {
        return new ResultNew({ type: "Err", err });
    }
    static tryFn(fn) {
        try {
            const result = fn();
            return Ok(result);
        }
        catch (err) {
            return Err(err);
        }
    }
    static async tryAsync(fn) {
        try {
            const result = await fn();
            return Ok(result);
        }
        catch (err) {
            return Err(err);
        }
    }
    eq(other) {
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
    unwrapOr(defaultValue) {
        return this.do(unwrapOr(defaultValue));
    }
    unwrapErr() {
        return this.do(unwrapErr());
    }
    unwrapErrOr(defaultErr) {
        return this.do(unwrapErrOr(defaultErr));
    }
    match(onOk, onErr) {
        return this.do(match(onOk, onErr));
    }
    do(fn) {
        return fn(this, this.inner);
    }
    pipe(fn) {
        return (...args) => fn(...args)(this, this.inner);
    }
}
export const Ok = ResultNew.Ok;
export const Err = ResultNew.Err;

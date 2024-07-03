import { None as NewNone } from "./base.js";
import { isSome } from "./api/is_some.js";
import { isNone } from "./api/is_none.js";
import { unwrap } from "./api/unwrap.js";
import { match } from "./api/match.js";
import { eq } from "./api/eq.js";
export class NewOption {
    inner;
    *[Symbol.iterator]() {
        if (isSome(this.inner)) {
            yield this.inner.value;
        }
    }
    constructor(inner) {
        this.inner = inner;
    }
    static None = () => new NewOption(NewNone);
    static Some(value) {
        return new NewOption({ type: "Some", value });
    }
    static fromBool(predicate) {
        return predicate ? NewOption.Some(predicate) : NewOption.None();
    }
    static fromNullable(v) {
        if (v !== undefined && v !== null) {
            return NewOption.Some(v);
        }
        return NewOption.None();
    }
    isSome() {
        return isSome(this.inner);
    }
    isNone() {
        return isNone(this.inner);
    }
    unwrap() {
        return unwrap(this.inner);
    }
    clone() {
        return isSome(this.inner)
            ? NewOption.Some(this.inner.value)
            : NewOption.None();
    }
    do(fn) {
        return fn(this, this.inner);
    }
    pipe(fn) {
        return (...args) => fn(...args)(this, this.inner);
    }
    eq(other, by = (x) => x) {
        return this.do(eq(other, by));
    }
    match(onSome, onNone) {
        return this.do(match(onSome, onNone));
    }
}
export const Some = NewOption.Some;
export const None = NewOption.None;

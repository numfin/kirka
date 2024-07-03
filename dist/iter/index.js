import { enumerate } from "./api/enumerate.js";
import { map } from "./api/map.js";
import { next } from "./api/next.js";
import { take } from "./api/take.js";
export class Iter {
    source;
    inner;
    [Symbol.iterator]() {
        return this.inner;
    }
    constructor(source) {
        this.source = source;
        this.inner = source();
    }
    static infinite() {
        return new Iter(function* () {
            while (true)
                yield;
        });
    }
    static from(source) {
        return new Iter(function* () {
            for (const item of source) {
                yield item;
            }
        });
    }
    static fromRange(from, to, inclusive = false) {
        if (from > to) {
            throw new Error(`Invalid range: From(${from}) > To(${to})`);
        }
        const extra = inclusive ? 1 : 0;
        return Iter.infinite()
            .do(take(to - from + extra))
            .do(enumerate())
            .do(map(({ index }) => index + from));
    }
    clone() {
        return new Iter(this.source);
    }
    next() {
        return next(this.inner);
    }
    do(fn) {
        return fn(this, this.source, this.inner);
    }
    pipe(fn) {
        return (...args) => fn(...args)(this, this.source, this.inner);
    }
}

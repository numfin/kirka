import { MapOperation } from "./map-operation";
import { FilterOperation } from "./filter-operation";
import { M } from "../maybe";
const defaultFromIterator = function (original) {
    return [...original];
};
const id = (x) => x;
class LazyIterator {
    source;
    operations;
    isCycled;
    static from(iterable) {
        return iterable instanceof LazyIterator
            ? iterable
            : new LazyIterator(iterable);
    }
    static withOperation(from, isCycled, ...operations) {
        return new LazyIterator(
        // @ts-expect-error Not sure why
        from.source, [...from.operations, ...operations], isCycled);
    }
    constructor(source, operations = [], isCycled = false) {
        this.source = source;
        this.operations = operations;
        this.isCycled = isCycled;
    }
    /* Intermediate Operations */
    append(item) {
        return this.chain([item]);
    }
    chain(...otherIterators) {
        return LazyIterator.from([this, ...otherIterators]).flatMap(LazyIterator.from);
    }
    compact() {
        return this.filter((a) => a !== undefined);
    }
    compress(mask) {
        let index = 0;
        return this.filter(() => Boolean(mask[index++]));
    }
    cycle() {
        return new LazyIterator(this.source, this.operations, true);
    }
    enumarate() {
        let index = 0;
        return this.map((item) => [index++, item]);
    }
    except(other) {
        const existed = new Set(other);
        return this.filter((value) => !existed.has(value));
    }
    filter(predicate) {
        return LazyIterator.withOperation(this, this.isCycled, new FilterOperation((v) => predicate(v)));
    }
    filterMap(predicateMapper) {
        return LazyIterator.withOperation(this, this.isCycled, new MapOperation((i) => predicateMapper(i)), new FilterOperation((v) => v instanceof M.MaybeConstructor ? v.isJust() : v !== undefined), new MapOperation((v) => (v instanceof M.MaybeConstructor ? v.value : v)));
    }
    flatten() {
        return this.flatMap((x) => x);
    }
    flatMap(fn) {
        return LazyIterator.withOperation(this, this.isCycled, new MapOperation((x) => fn(x), true));
    }
    intersect(other) {
        const existed = new Set(other);
        return this.filter((value) => existed.has(value));
    }
    map(fn) {
        return LazyIterator.withOperation(this, this.isCycled, new MapOperation((x) => fn(x)));
    }
    permutations() {
        return this.enumarate().flatMap(([i, x1]) => this.enumarate().filterMap(([j, x2]) => i !== j ? M.just([x1, x2]) : M.none()));
    }
    prepend(item) {
        return LazyIterator.from([item]).chain(this);
    }
    reverse() {
        if (this.isCycled) {
            throw new Error("Reverse can work only at finite iterable sequence.");
        }
        const oldIterator = this instanceof Array ? this : [...this];
        let i = oldIterator.length - 1;
        return this.map(() => oldIterator[i--]);
    }
    skip(n) {
        return this.filter(() => n === 0 || n-- <= 0);
    }
    scan(fn, accumulator) {
        return this.map((value) => (accumulator = fn(accumulator, value)));
    }
    skipWhile(predicate) {
        let hasBeenFalse = false;
        return this.filter((i) => hasBeenFalse || (hasBeenFalse = !predicate(i)));
    }
    slice(start = 0, end) {
        let index = 0;
        return LazyIterator.withOperation(this, end === undefined && this.isCycled, new FilterOperation((_, terminate) => {
            if (end !== undefined && index >= end) {
                terminate();
                return false;
            }
            return index++ >= start;
        }));
    }
    stepBy(step) {
        if (step <= 0) {
            throw new Error("step should be greater than 0");
        }
        let n = 0;
        return this.filter(() => {
            if (--n <= 0) {
                n = step;
                return true;
            }
            return false;
        });
    }
    take(n) {
        return LazyIterator.withOperation(this, false, new FilterOperation((_, terminate) => {
            if (n-- <= 0) {
                terminate();
                return false;
            }
            return true;
        }));
    }
    takeWhile(predicate) {
        return LazyIterator.withOperation(this, false, new FilterOperation((x, terminate) => {
            if (!predicate(x)) {
                terminate();
                return false;
            }
            return true;
        }));
    }
    unique() {
        const existedValues = new Set();
        return this.filter((value) => {
            if (existedValues.has(value)) {
                return false;
            }
            existedValues.add(value);
            return true;
        });
    }
    zip(other) {
        const otherIterator = other[Symbol.iterator]();
        return LazyIterator.withOperation(this, this.isCycled, new MapOperation((first, terminate) => {
            const second = otherIterator.next();
            if (second.done) {
                terminate();
            }
            return [first, second.value];
        }));
    }
    /* Terminal Operations */
    collect(fromIterator = defaultFromIterator) {
        if (typeof fromIterator !== "function") {
            throw new Error("fromIteartor should be implemented as function for lazy iterating");
        }
        return fromIterator(this);
    }
    *[Symbol.iterator]() {
        let isEmpty = true;
        do {
            outer: for (let value of this.source) {
                isEmpty = false;
                for (let i = 0; i < this.operations.length; i++) {
                    const operation = this.operations[i];
                    const maybeValue = operation.execute(value);
                    if (operation.isTerminated) {
                        return;
                    }
                    if (maybeValue.isNone()) {
                        continue outer;
                    }
                    value = maybeValue.value;
                    if (operation.isFlat && value instanceof LazyIterator) {
                        yield* LazyIterator.withOperation(value, value.isCycled, ...this.operations.slice(i + 1));
                        continue outer;
                    }
                }
                yield value;
            }
        } while (this.isCycled && !isEmpty);
    }
    forEach(fn) {
        if (this.isCycled) {
            throw new Error("All terminated methods will be infinity executed!");
        }
        outer: for (let value of this.source) {
            for (let i = 0; i < this.operations.length; i++) {
                const operation = this.operations[i];
                const maybeValue = operation.execute(value);
                if (operation.isTerminated) {
                    return;
                }
                if (maybeValue.isNone()) {
                    continue outer;
                }
                value = maybeValue.value;
                if (operation.isFlat && value instanceof LazyIterator) {
                    LazyIterator.withOperation(value, value.isCycled, ...this.operations.slice(i + 1)).forEach(fn);
                    continue outer;
                }
            }
            const result = fn(value);
            if (result instanceof M.MaybeConstructor && result.isNone()) {
                return;
            }
        }
    }
    all(predicate) {
        let result = true;
        // eslint-disable-next-line no-cond-assign
        this.forEach((value) => (result = predicate(value)) ? M.just(undefined) : M.none());
        return result;
    }
    any(predicate) {
        let result = false;
        // eslint-disable-next-line no-cond-assign
        this.forEach((value) => (result = predicate(value)) ? M.none() : M.just(undefined));
        return result;
    }
    count() {
        return this.fold((c) => c + 1, 0);
    }
    contains(elem) {
        return this.any((a) => a === elem);
    }
    find(predicate, withoutMaybe = false) {
        let foundValue = M.none();
        this.forEach((value) => {
            if (predicate(value)) {
                foundValue = M.just(value);
                return M.none();
            }
            return M.just(undefined);
        });
        return withoutMaybe ? foundValue.value : foundValue;
    }
    findMap(predicateMapper, withoutMaybe = false) {
        let result = M.none();
        this.forEach((item) => {
            const maybeItem = predicateMapper(item);
            if ((maybeItem instanceof M.MaybeConstructor && maybeItem.isNone()) ||
                maybeItem === undefined) {
                return M.just(undefined);
            }
            result =
                maybeItem instanceof M.MaybeConstructor
                    ? maybeItem
                    : M.just(maybeItem);
            return M.none();
        });
        return withoutMaybe ? result.value : result;
    }
    first(withoutMaybe = false) {
        const first = this[Symbol.iterator]().next();
        if (withoutMaybe) {
            return first.value;
        }
        return first.done ? M.none() : M.just(first.value);
    }
    fold(fn, accumulator) {
        this.forEach((value) => {
            if (accumulator === undefined) {
                accumulator = value;
            }
            else {
                accumulator = fn(accumulator, value);
            }
        });
        return accumulator;
    }
    isEmpty() {
        return this.first().isNone();
    }
    last(withoutMaybe = false) {
        const result = this.fold((_, a) => M.just(a), M.none());
        return withoutMaybe ? result.value : result;
    }
    max(getValue = id, withoutMaybe = false) {
        const res = this.fold((max, a) => M.just(max.isNone() || getValue(a) >= getValue(max.value)
            ? a
            : max.value), M.none());
        return withoutMaybe ? res.value : res;
    }
    min(getValue = id, withoutMaybe = false) {
        const res = this.fold((max, a) => M.just(max.isNone() || getValue(a) < getValue(max.value)
            ? a
            : max.value), M.none());
        return withoutMaybe ? res.value : res;
    }
    nth(n, withoutMaybe = false) {
        let result = M.none();
        this.forEach((value) => {
            if (n-- <= 0) {
                result = M.just(value);
                return M.none();
            }
            return M.just(undefined);
        });
        return withoutMaybe ? result.value : result;
    }
    partion(predicate) {
        return this.fold(([left, right], value) => {
            if (predicate(value)) {
                left.push(value);
            }
            else {
                right.push(value);
            }
            return [left, right];
        }, [[], []]);
    }
    position(predicate, withoutMaybe = false) {
        let index = 0;
        let hasFound = false;
        this.forEach((value) => {
            if (predicate(value)) {
                hasFound = true;
                return M.none();
            }
            index++;
            return M.just(undefined);
        });
        const result = hasFound ? M.just(index) : M.none();
        return withoutMaybe ? result.value : result;
    }
    product() {
        return this.fold((res, a) => res * a, 1);
    }
    sum() {
        return this.fold((sum, a) => sum + a, 0);
    }
    unzip() {
        const left = [];
        const right = [];
        return this.fold(([left, right], [a, b]) => {
            left.push(a);
            right.push(b);
            return [left, right];
        }, [left, right]);
    }
}
export const Iter = LazyIterator;
//# sourceMappingURL=index.js.map
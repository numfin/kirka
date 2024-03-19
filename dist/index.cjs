'use strict';

function bool(v) {
    return v ? Some(v) : None();
}

function ok$1(result) {
    return result.ok();
}

function err$1(result) {
    return result.err();
}

function nullable(v) {
    if (v !== undefined && v !== null) {
        return Some(v);
    }
    return None();
}

const OptionFrom = {
    bool,
    nullable,
    ok: ok$1,
    err: err$1,
};

function option(option, err) {
    return option.result(err);
}

const ResultFrom = {
    option,
};

function and$1(result, otherResult) {
    return result.andThen(() => otherResult);
}

function or$1(result, otherResult) {
    return result.orElse(() => otherResult);
}

function unionErr(value) {
    return { value, type: "Err" };
}

function andThen$1(result, fn) {
    if (result.isOk()) {
        return fn(result.unwrap()).inner();
    }
    return unionErr(result.unwrapErr());
}

function unionOk(value) {
    return { value, type: "Ok" };
}

function orElse$1(result, fn) {
    if (result.isErr()) {
        return fn(result.unwrapErr()).inner();
    }
    return unionOk(result.unwrap());
}

function eq$2(self, other) {
    const a = self.inner();
    const b = other.inner();
    return a.type === b.type && a.value === b.value;
}

function format$1(result, formatter) {
    const inner = result.inner();
    return `Result.${inner.type}(${formatter?.(result) ?? inner.value})`;
}

function inspect(result, fn) {
    result.map(fn);
    return result;
}

function inspectErr(result, fn) {
    result.mapErr(fn);
    return result;
}

function isOk(result) {
    return result.type === "Ok";
}

function isOkAnd(result, fn) {
    return result.isOk() && fn(result.unwrap());
}

function isErr(result) {
    return result.type === "Err";
}

function isErrAnd(result, fn) {
    return result.isErr() && fn(result.unwrapErr());
}

function map$2(result, fn) {
    if (result.type === "Ok") {
        return unionOk(fn(result.value));
    }
    else {
        return unionErr(result.value);
    }
}

function mapErr(result, fn) {
    if (result.type === "Err") {
        return unionErr(fn(result.value));
    }
    else {
        return unionOk(result.value);
    }
}

function ok(result) {
    return result.isOk() ? Some(result.inner().value) : None();
}

function err(result) {
    return result.isErr() ? Some(result.unwrapErr()) : None();
}

function unwrap$1(result) {
    const inner = result.inner();
    if (result.isErr()) {
        throw new Error(`unwrap() on ${result.format()}`);
    }
    return inner.value;
}

function uwnrapOr(result, default_value) {
    return result.isOk() ? result.unwrap() : default_value;
}

function unwrapErr(result) {
    if (result.isOk()) {
        throw new Error(`unwrapErr called on ${result.format()}`);
    }
    return result.inner().value;
}

function unwrapErrOr(result, default_value) {
    return result.isErr() ? result.unwrapErr() : default_value;
}

function match$1(source, onOk, onErr) {
    if (source.type === "Ok") {
        return onOk(source.value);
    }
    else {
        return onErr(source.value);
    }
}

function intoIter$1(result) {
    if (isOk(result)) {
        return IterFrom.array([result.value]);
    }
    return IterFrom.array([]);
}

function createResult(result) {
    const api = {
        *[Symbol.iterator]() {
            if (isOk(result)) {
                yield result.value;
            }
        },
        intoIter: () => intoIter$1(result),
        inner: () => result,
        eq: (other) => eq$2(api, other),
        format: (formatter) => format$1(api, formatter),
        isOk: () => isOk(result),
        isErr: () => isErr(result),
        unwrap: () => unwrap$1(api),
        unwrapErr: () => unwrapErr(api),
        unwrapOr: (default_value) => uwnrapOr(api, default_value),
        unwrapErrOr: (default_value) => unwrapErrOr(api, default_value),
        isOkAnd: (fn) => isOkAnd(api, fn),
        isErrAnd: (fn) => isErrAnd(api, fn),
        map: (fn) => createResult(map$2(result, fn)),
        mapErr: (fn) => createResult(mapErr(result, fn)),
        inspect: (fn) => inspect(api, fn),
        inspectErr: (fn) => inspectErr(api, fn),
        andThen: (fn) => createResult(andThen$1(api, fn)),
        orElse: (fn) => createResult(orElse$1(api, fn)),
        and: (new_value) => and$1(api, new_value),
        or: (new_value) => or$1(api, new_value),
        ok: () => ok(api),
        err: () => err(api),
        match: (onOk, onErr) => match$1(result, onOk, onErr),
    };
    return api;
}
function Ok(value) {
    return createResult(unionOk(value));
}
function Err(value) {
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
function tryFn(fn) {
    try {
        return Ok(fn());
    }
    catch (err) {
        return Err(err);
    }
}

function result(option, noneErr) {
    return option.isSome() ? Ok(option.unwrap()) : Err(noneErr());
}

function unionNone() {
    return { type: "None" };
}

function andThen(option, fn) {
    return option.isSome() ? fn(option.unwrap()).inner() : unionNone();
}

function and(current_value, new_value) {
    return current_value.isSome() ? new_value.inner() : unionNone();
}

function orElse(option, fn) {
    return option.isSome() ? option.inner() : fn().inner();
}

function or(current_value, new_value) {
    return current_value.isSome() ? current_value.inner() : new_value.inner();
}

function unionSome(value) {
    return { type: "Some", value };
}

function format(option, fn) {
    const inner = option.inner();
    return inner.type === "Some"
        ? `Some(${fn?.(option) ?? inner.value})`
        : `None`;
}

function unwrap(option) {
    const inner = option.inner();
    if (inner.type === "None") {
        throw new Error(`unwrap called on ${format(option)}`);
    }
    return inner.value;
}

function map$1(option, fn) {
    const inner = option.inner();
    if (inner.type === "Some") {
        return unionSome(fn(unwrap(option)));
    }
    return unionNone();
}

function unwrapOr(option, default_value) {
    return option.type === "None" ? default_value : option.value;
}

function isSomeAnd(option, fn) {
    return option.isSome() && fn(option.unwrap());
}

function take$1(option) {
    if (option.type === "Some") {
        option.type = "None";
        const value = option.value;
        option.value = undefined;
        return unionSome(value);
    }
    return unionNone();
}

function isSome(option) {
    return option.type === "Some";
}

function isNone(option) {
    return option.type === "None";
}

function clone(option) {
    return option.type === "Some" ? unionSome(option.value) : unionNone();
}

function eq$1(option, value, by = (x) => x) {
    if (value.isNone() || option.isNone()) {
        return value.isNone() && option.isNone();
    }
    return by(value.unwrap()) === by(option.unwrap());
}

function filter$1(source, fn) {
    if (source.isSomeAnd(fn)) {
        return source;
    }
    return None();
}

function isNoneAnd(option, fn) {
    return option.isNone() && fn();
}

function match(source, onSome, onNone) {
    return source.map(onSome).unwrapOrElse(onNone);
}

function unwrapOrElse(option, default_fn) {
    return option.type === "None" ? default_fn() : option.value;
}

function intoIter(option) {
    if (isSome(option)) {
        return IterFrom.array([option.value]);
    }
    return IterFrom.array([]);
}

function flatten$1(source) {
    if (source.isNone()) {
        return source;
    }
    const v = source.unwrap();
    try {
        if (v.isSome()) {
            return v;
        }
        return v;
    }
    catch (_) {
        return source;
    }
}

function createOption(v) {
    let inner = v;
    const api = {
        *[Symbol.iterator]() {
            if (isSome(inner)) {
                yield inner.value;
            }
        },
        intoIter: () => intoIter(inner),
        inner: () => inner,
        eq: (value, by) => eq$1(api, value, by),
        format: (formatter) => format(api, formatter),
        clone: () => createOption(clone(inner)),
        unwrap: () => unwrap(api),
        unwrapOr: (default_value) => unwrapOr(inner, default_value),
        unwrapOrElse: (fn) => unwrapOrElse(inner, fn),
        isNone: () => isNone(inner),
        isSome: () => isSome(inner),
        take: () => createOption(take$1(inner)),
        isSomeAnd: (fn) => isSomeAnd(api, fn),
        isNoneAnd: (fn) => isNoneAnd(api, fn),
        map: (fn) => createOption(map$1(api, fn)),
        or: (new_value) => createOption(or(api, new_value)),
        orElse: (fn) => createOption(orElse(api, fn)),
        and: (new_value) => createOption(and(api, new_value)),
        andThen: (fn) => createOption(andThen(api, fn)),
        result: (fn) => result(api, fn),
        filter: (fn) => filter$1(api, fn),
        match: (onSome, onNone) => match(api, onSome, onNone),
        flatten: () => flatten$1(api),
    };
    return api;
}
function Some(v) {
    return createOption(unionSome(v));
}
function None() {
    return createOption(unionNone());
}

exports.Order = void 0;
(function (Order) {
    Order[Order["Greater"] = 1] = "Greater";
    Order[Order["Equal"] = 0] = "Equal";
    Order[Order["Less"] = -1] = "Less";
})(exports.Order || (exports.Order = {}));

function defaultMap(item) {
    return item;
}

function defaultFilter(_item) {
    return true;
}

function* iterFactory(source, map = (defaultMap), filter = (defaultFilter)) {
    const check = (item) => filter(item);
    for (const item of source) {
        const mappedItem = map(item);
        if (check(mappedItem)) {
            yield mappedItem;
        }
    }
}

function iterable(source) {
    return createIter(() => iterFactory(source));
}

function array(source) {
    return iterable(source);
}

function* iterInfinite() {
    while (true) {
        yield;
    }
}

function range(from, to, inclusive = false) {
    if (from > to) {
        throw new Error(`Invalid range: From(${from}) > To(${to})`);
    }
    const extra = inclusive ? 1 : 0;
    return createIter(() => iterInfinite())
        .take(to - from + extra)
        .enumerate()
        .map(({ index }) => index + from);
}

const IterFrom = {
    array,
    iterable,
    range,
};

function all(source, fn) {
    for (let item of source) {
        if (!fn(item)) {
            return false;
        }
    }
    return true;
}

function any(source, fn) {
    for (let item of source) {
        if (fn(item)) {
            return true;
        }
    }
    return false;
}

function collect(source) {
    return Array.from(source);
}

function* iterCycle(source) {
    let iter = source();
    let firstValue = iter.next();
    if (firstValue.done)
        return;
    yield firstValue.value;
    while (true) {
        let nextValue = iter.next();
        if (nextValue.done) {
            iter = source();
        }
        else {
            yield nextValue.value;
        }
    }
}

function cycle(source) {
    return iterCycle(source);
}

function* iterEnumerate(source) {
    let index = 0;
    for (const item of source) {
        yield { item, index };
        index += 1;
    }
}

function enumerate(source) {
    return iterEnumerate(source);
}

function eq(source, another, by) {
    const sourceIter = source.recreate();
    const anotherIter = IterFrom.iterable(another);
    while (true) {
        const sourceNext = sourceIter.next();
        const anotherNext = anotherIter.next();
        if (sourceNext.isSome() || anotherNext.isSome()) {
            if (!sourceNext.eq(anotherNext, by)) {
                return false;
            }
        }
        else {
            return true;
        }
    }
}

function filter(source, fn) {
    return iterFactory(source, (x) => x, fn);
}

function filterMap(source, fn) {
    return source
        .map(fn)
        .filter((v) => v.isSome())
        .map((v) => v.unwrap());
}

function find(source, fn) {
    const result = source
        .skipWhile((item) => !fn(item))
        .take(1)
        .collect();
    return result.length > 0 ? Some(result[0]) : None();
}

function findMap(source, fn) {
    const result = source
        .map(fn)
        .skipWhile((v) => v.isNone())
        .take(1)
        .collect();
    return result.length > 0 ? result[0] : None();
}

function first(source) {
    for (const item of source) {
        return Some(item);
    }
    return None();
}

function* iterFlat(source) {
    for (const item of source) {
        for (const subItem of item) {
            yield subItem;
        }
    }
}

function flatMap(source, fn) {
    return iterFlat(source.map(fn));
}

function toIterable(source) {
    if (source && typeof source === "object" && Symbol.iterator in source) {
        return source;
    }
    return [source];
}

function flatten(source) {
    return source.map(toIterable).flatMap((v) => v);
}

function fold(source, startFrom, fn) {
    let lastAcc = startFrom;
    for (const item of source) {
        lastAcc = fn(lastAcc, item);
    }
    return lastAcc;
}

function forEach(source, fn) {
    for (const item of source) {
        fn(item);
    }
}

function get(source, index) {
    if (index < 0) {
        return None();
    }
    return source.skip(index).first();
}

function* iterIntersperse(source, fn) {
    let alreadyRan = false;
    for (const item of source) {
        if (alreadyRan) {
            yield fn();
        }
        yield item;
        alreadyRan = true;
    }
}

function intersperse(source, value) {
    return iterIntersperse(source, () => value);
}

function isEmpty(source) {
    for (const _ of source) {
        return false;
    }
    return true;
}

function last(source) {
    return source.fold(None(), (_, item) => Some(item));
}

function len(source) {
    return Array.from(source).length;
}

function map(source, fn) {
    return iterFactory(source, fn);
}

function maxBy(source, fn) {
    let max = source.first();
    for (const item of source.skip(1)) {
        max = max
            .filter((minItem) => fn(item) > fn(minItem))
            .map(() => item)
            .or(max);
    }
    return max;
}

function minBy(source, fn) {
    let min = source.first();
    for (const item of source.skip(1)) {
        min = min
            .filter((minItem) => fn(item) < fn(minItem))
            .map(() => item)
            .or(min);
    }
    return min;
}

function next(source) {
    const nextValue = source.next();
    if (nextValue.done) {
        return None();
    }
    else {
        return Some(nextValue.value);
    }
}

function nth(source, amount) {
    if (amount <= 0) {
        throw new Error(`Cannot iterate ${amount} - 1 times`);
    }
    for (let i = 0; i < amount - 1; i++) {
        source.next();
    }
    return source.next();
}

function partition(source, fn) {
    const iterA = [];
    const iterB = [];
    for (const item of source) {
        if (fn(item)) {
            iterA.push(item);
        }
        else {
            iterB.push(item);
        }
    }
    return [IterFrom.array(iterA), IterFrom.array(iterB)];
}

function position(source, fn) {
    return source
        .enumerate()
        .find(({ item }) => fn(item))
        .map(({ index }) => index);
}

function reverse(source) {
    return IterFrom.array(Array.from(source).reverse());
}

function skip(source, skipAmount) {
    return source
        .enumerate()
        .skipWhile(({ index }) => index < skipAmount)
        .map(({ item }) => item);
}

function* iterSkipWhile(source, filter) {
    let flag = false;
    for (let item of source) {
        if (flag || !filter(item)) {
            flag = true;
            yield item;
        }
    }
}

function skipWhile(source, fn) {
    return iterSkipWhile(source, fn);
}

function stepBy(source, amount) {
    if (amount <= 0) {
        throw new Error(`.stepBy() amount should be > 0`);
    }
    return source
        .enumerate()
        .filter(({ index }) => index === 0 || index % amount === 0)
        .map(({ item }) => item);
}

function take(source, takeAmount) {
    return source
        .enumerate()
        .takeWhile(({ index }) => index < takeAmount)
        .map(({ item }) => item);
}

function* iterTakeWhile(source, filter) {
    for (let item of source) {
        if (filter(item)) {
            yield item;
        }
        else {
            return;
        }
    }
}

function takeWhile(source, fn) {
    return iterTakeWhile(source, fn);
}

function createIter(source) {
    /** `Generator<T>` with local state, used for `.next()` iteration */
    const inner = source();
    const api = {
        *[Symbol.iterator]() {
            for (const item of source()) {
                yield item;
            }
        },
        intoIter: () => api.recreate(),
        next: () => next(inner),
        recreate: () => createIter(source),
        collect: () => collect(api),
        map: (fn) => createIter(() => map(api, fn)),
        filter: (fn) => createIter(() => filter(api, fn)),
        filterMap: (fn) => filterMap(api, fn),
        enumerate: () => createIter(() => enumerate(api)),
        skipWhile: (fn) => createIter(() => skipWhile(api, fn)),
        skip: (i) => skip(api, i),
        takeWhile: (fn) => createIter(() => takeWhile(api, fn)),
        take: (i) => take(api, i),
        nth: (amount) => nth(api, amount),
        all: (fn) => all(api, fn),
        any: (fn) => any(api, fn),
        cycle: () => createIter(() => cycle(source)),
        eq: (another, by) => eq(api, another, by),
        find: (fn) => find(api, fn),
        findMap: (fn) => findMap(api, fn),
        position: (fn) => position(api, fn),
        flatMap: (fn) => createIter(() => flatMap(api, fn)),
        flatten: () => flatten(api),
        fold: (startFrom, fn) => fold(api, startFrom, fn),
        stepBy: (amount) => stepBy(api, amount),
        forEach: (fn) => forEach(api, fn),
        intersperse: (value) => createIter(() => intersperse(api, value)),
        isEmpty: () => isEmpty(api),
        len: () => len(api),
        first: () => first(api),
        last: () => last(api),
        minBy: (fn) => minBy(api, fn),
        maxBy: (fn) => maxBy(api, fn),
        partition: (fn) => partition(api, fn),
        reverse: () => reverse(api),
        get: (pos) => get(api, pos),
    };
    return api;
}

class AnyHow {
    err;
    ctx;
    constructor(err, ctx = []) {
        this.err = err;
        this.ctx = ctx;
    }
    static msg(msg) {
        return new this(msg);
    }
    static expect(expected, got) {
        return this.msg(`Expected ${expected}, got: ${got}`);
    }
    wrapWith(msgFn) {
        this.ctx.push(msgFn());
        return this;
    }
    toString() {
        const report = Array.from(this.ctx);
        report.push(this.err.toString());
        return report.reverse().join("\n");
    }
    toErr() {
        return Err(this);
    }
}

function Pipe(identity, members = []) {
    const pipe = {
        call(...v) {
            return members.reduce((lastV, member) => member(lastV), identity(...v));
        },
        chain(member) {
            members.push(member);
            return pipe;
        },
        clone() {
            return Pipe(identity, Array.from(members));
        },
    };
    return pipe;
}

function SchemaCustom(createFn, flags = { isOptional: false }, rules = [], transforms = Pipe((v) => v)) {
    const validate = (v) => IterFrom.array(rules)
        .enumerate()
        .findMap(({ index, item }) => (item(v) ? None() : Some(index)))
        .match((index) => AnyHow.msg(`Rule ${index} failed`).toErr(), () => Ok(v));
    const api = {
        transform(checkFn) {
            return SchemaCustom(createFn, flags, rules, transforms.clone().chain((v) => v.andThen(checkFn)));
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
                return OptionFrom.nullable(v).match((v) => validateAndTransform.call(v).map(Some), () => Ok(None()));
            }
            return validateAndTransform.call(v);
        },
        check(v) {
            return api.parse(v).isOk();
        },
    };
    return api;
}

function defaultVahter$5(equalTo) {
    return SchemaCustom((v) => {
        if (typeof v !== "number") {
            return AnyHow.expect("number", typeof v).toErr();
        }
        else if (isNaN(v)) {
            return AnyHow.expect("number", v).toErr();
        }
        else if (!isFinite(v)) {
            return AnyHow.expect("finite number", v).toErr();
        }
        else if (typeof equalTo === "number") {
            return v === equalTo ? Ok(v) : AnyHow.expect(equalTo, v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
function SchemaNumInternal(vahter) {
    const api = {
        optional() {
            return SchemaNumInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaNumInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaNumInternal(vahter.transform(fn));
        },
    };
    return api;
}
const SchemaNum = (equalTo) => SchemaNumInternal(defaultVahter$5(equalTo));

function defaultVahter$4(schema) {
    return SchemaCustom((items) => {
        if (!Array.isArray(items)) {
            return AnyHow.expect("array", String(items)).toErr();
        }
        const parsedArr = [];
        for (const { index, item } of IterFrom.array(items).enumerate()) {
            const result = schema.parse(item);
            if (result.isOk()) {
                parsedArr.push(result.unwrap());
            }
            else {
                return result
                    .unwrapErr()
                    .wrapWith(() => `Array item#${index}`)
                    .toErr();
            }
        }
        return Ok(parsedArr);
    });
}
function SchemaArrInternal(vahter) {
    const api = {
        optional() {
            return SchemaArrInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaArrInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaArrInternal(vahter.transform(fn));
        },
    };
    return api;
}
const SchemaArr = (schema) => SchemaArrInternal(defaultVahter$4(schema));

function defaultVahter$3(equalTo) {
    return SchemaCustom((v) => {
        if (typeof v !== "boolean") {
            return AnyHow.expect("boolean", typeof v).toErr();
        }
        else if (typeof equalTo === "boolean") {
            return equalTo === v ? Ok(v) : AnyHow.expect(equalTo, v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
function SchemaBoolInternal(vahter) {
    const api = {
        optional() {
            return SchemaBoolInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaBoolInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaBoolInternal(vahter.transform(fn));
        },
    };
    return api;
}
const SchemaBool = (equalTo) => SchemaBoolInternal(defaultVahter$3(equalTo));

function defaultVahter$2(schema, options) {
    return SchemaCustom((v) => {
        if (typeof v !== "object") {
            return AnyHow.expect("object", typeof v).toErr();
        }
        else if (v === null) {
            return AnyHow.expect("object", "null").toErr();
        }
        else if (Array.isArray(v)) {
            return AnyHow.expect("object", v).toErr();
        }
        const parsedObj = (options.trimExtra ? {} : v);
        for (const [prop, propSchema] of Object.entries(schema)) {
            const result = propSchema.parse(v[prop]);
            if (result.isOk()) {
                parsedObj[prop] = result.unwrap();
            }
            else {
                return result
                    .unwrapErr()
                    .wrapWith(() => `Field: ${prop}`)
                    .toErr();
            }
        }
        return Ok(parsedObj);
    });
}
function SchemaDictInternal(vahter) {
    const api = {
        optional() {
            return SchemaDictInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaDictInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaDictInternal(vahter.transform(fn));
        },
    };
    return api;
}
const SchemaDict = (schema, options) => SchemaDictInternal(defaultVahter$2(schema, {
    trimExtra: options?.trimExtra ?? true,
}));

function defaultVahter$1(equalTo) {
    return SchemaCustom((v) => {
        if (typeof v !== "string") {
            return AnyHow.expect("string", typeof v).toErr();
        }
        else if (typeof equalTo === "string") {
            return v === equalTo ? Ok(v) : AnyHow.expect(equalTo, v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
function SchemaStrInternal(vahter) {
    const api = {
        optional() {
            return SchemaStrInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
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
            return api.re(() => /^[\p{Letter}\p{Mark}\d]*$/gmu, "alphanumeric string");
        },
        re(re, kind) {
            return SchemaStrInternal(vahter.transform((v) => {
                const invokedRe = re();
                return regexp(invokedRe, kind ?? invokedRe.source, v);
            }));
        },
    };
    return api;
}
const regexp = (re, kind, value) => OptionFrom.bool(re.test(value))
    .result(() => AnyHow.expect(kind, value))
    .map(() => value)
    .orElse((err) => err.toErr());
const SchemaStr = (equalTo) => SchemaStrInternal(defaultVahter$1(equalTo));

function UnionInstance(currentTag, value) {
    const api = {
        _tag: currentTag,
        _value: value,
        is(tag, cond) {
            const condition = cond ?? (() => true);
            return tag === currentTag && condition(value);
        },
        matchSome(matcher) {
            if (matcher.hasOwnProperty(currentTag)) {
                const fn = matcher[currentTag];
                if (typeof fn === "function") {
                    return Some(fn(value));
                }
            }
            return None();
        },
        match(matcher) {
            return api.matchSome(matcher).unwrap();
        },
    };
    return api;
}
function defaultVahter(unionSchemas) {
    return SchemaCustom((v) => {
        for (const [tag, tagSchema] of Object.entries(unionSchemas)) {
            const result = tagSchema.parse(v).inner();
            if (result.type === "Ok") {
                return Ok(UnionInstance(tag, result.value));
            }
        }
        const variants = Object.keys(unionSchemas);
        return AnyHow.expect(`Union of [${variants}]`, String(v)).toErr();
    });
}
function SchemaUnionInternal(schema, vahter) {
    const api = {
        optional() {
            return vahter.optional();
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
    };
    return new Proxy({}, {
        get(_, tag) {
            if (schema.hasOwnProperty(tag)) {
                return (v) => UnionInstance(tag, v);
            }
            return api[tag];
        },
    });
}
const SchemaUnion = (schema) => SchemaUnionInternal(schema, defaultVahter(schema));

const SchemaRecord = (keySchema, valueSchema) => SchemaDict({}, {
    trimExtra: false,
}).transform((v) => {
    const result = {};
    for (const [key, value] of Object.entries(v)) {
        const parsedKey = keySchema.parse(key).inner();
        if (parsedKey.type === "Err") {
            return parsedKey.value.toErr();
        }
        const parsedValue = valueSchema.parse(value).inner();
        if (parsedValue.type === "Err") {
            return parsedValue.value
                .wrapWith(() => `Invalid value for key: ${key}`)
                .toErr();
        }
        result[parsedKey.value] = parsedValue.value;
    }
    return Ok(result);
});

const Schema = {
    /**
     * # Description
     * Number type
     *
     * # Example
     * ```ts
     * const s = Schema.num()
     *   .optional()
     *   .is((v) => v > 0)
     *   .transform((v) => Ok(v * 2))
     * ```
     */
    num: SchemaNum,
    /**
     * # Description
     * Number type
     *
     * # Example
     * ```ts
     * const s = Schema.str()
     *   .optional()
     *   .is((v) => v.length > 0)
     *   .transform((v) => Ok(v + "asd"))
     * ```
     */
    str: SchemaStr,
    /**
     * # Description
     * Boolean type
     *
     * # Example
     * ```ts
     * const s = Schema.bool()
     *   .optional()
     *   .is((v) => v === true)
     *   .transform((v) => Ok(!v))
     * ```
     */
    bool: SchemaBool,
    /**
     * # Description
     * Boilerplate for your own type. Contains transformation and validation functionality.
     *
     * # Example
     * ```ts
     * const cs = Schema.custom<T>((v: unknown) => {
     *   if (condition) {
     *      return Ok(x as T)
     *   } else {
     *      return AnyHow.expect("Expected T", typeof v).toErr()
     *   }
     * })
     *   .optional()
     *   .is((v: T) => true)
     *   .transform((v: T) => Ok(v))
     * ```
     */
    custom: SchemaCustom,
    /**
     * # Description
     * "Object" type
     *
     * # Example
     * ```ts
     * const s = Schema.dict({
     *   str: Schema.str(),
     *   num: Schema.num(),
     *   bool: Schema.bool()
     * }, { ...options })
     *   .optional()
     *   .is((v) => v.str.length > 0)
     *   .transform((v) => {
     *     v.num *= 2;
     *     return Ok(v)
     *   })
     * ```
     */
    dict: SchemaDict,
    /**
     * # Description
     * Helper over `Schema.dict` to define `Record<K, T>` object
     *
     * # Example
     * ```ts
     * const s = Schema.record(Schema.str(), Schema.num())
     *   .optional()
     *   .is((v) => Object.keys(v).length > 0)
     *   .transform((v) => {
     *     v.a *= 2;
     *     return Ok(v)
     *   });
     * const value: Record<string, Option<number>> = s.parse({a: 3}).unwrap();
     *
     * ```
     */
    record: SchemaRecord,
    /**
     * # Description
     * Array type
     *
     * # Example
     * ```ts
     * const s = Schema.arr(Schema.str())
     *   .optional()
     *   .is((v) => v.length > 0)
     *   .transform((v) => {
     *     v.push("another")
     *     return Ok(v)
     *   })
     * ```
     */
    arr: SchemaArr,
    /**
     * # Description
     * Tagged union. Used to describe different variants of type
     *
     * # Example
     * ```ts
     * // Parse unknown value to union
     * const innerUnion = Schema.union({
     *   v3v1: Schema.arr(Schema.num()),
     *   v3v2: Schema.str()
     * });
     * const tUnion = Schema.union({
     *   v1: Schema.num(),
     *   v2: Schema.str(),
     *   v3: innerUnion
     * });
     * const parsedValue: UnionInstance<...> = tUnion.parse(...);
     * // Or create union instance yourself
     * const v1 = tUnion.v1(10);
     * const v2 = tUnion.v2("hi");
     * const v3v1 = tUnion.v3(innerUnion.v3v1([42]));
     * const v3v2 = tUnion.v3(innerUnion.v3v2("qwerty"));
     *
     * const v = v1.match({
     *   v1: (v) => 1, // all returns must have same type
     *   v2: (v) => 2,
     *   v3: (v) => 3,
     * }); // 1
     * const v = v2.matchSome({
     *   v2: (v) => 2
     * }); // Some(2)
     *
     * const isV3 = v3.is("v3") // true
     * ```
     */
    union: SchemaUnion,
};

exports.AnyHow = AnyHow;
exports.Err = Err;
exports.IterFrom = IterFrom;
exports.None = None;
exports.Ok = Ok;
exports.OptionFrom = OptionFrom;
exports.Pipe = Pipe;
exports.ResultFrom = ResultFrom;
exports.Schema = Schema;
exports.Some = Some;
exports.createIter = createIter;
exports.createOption = createOption;
exports.createResult = createResult;
exports.tryFn = tryFn;

'use strict';

const None$1 = { type: "None" };

function isSome(inner) {
    return inner !== None$1;
}

function isNone(inner) {
    return inner === None$1;
}

function unwrap$1(inner) {
    if (isNone(inner)) {
        throw new Error(`unwrap called on None`);
    }
    return inner.value;
}

function createAggregator$2(fn) {
    return (option, inner) => fn(option, inner);
}

function match$1(onSome, onNone) {
    return createAggregator$2((_, inner) => {
        if (isSome(inner)) {
            return onSome(inner.value);
        }
        return onNone();
    });
}

function eq$1(other, by = (x) => x) {
    return createAggregator$2((_, inner) => {
        if (isSome(inner) && isSome(other.inner)) {
            return by(inner.value) === by(other.inner.value);
        }
        return isNone(inner) && isNone(other.inner);
    });
}

class NewOption {
    inner;
    *[Symbol.iterator]() {
        if (isSome(this.inner)) {
            yield this.inner.value;
        }
    }
    constructor(inner) {
        this.inner = inner;
    }
    static None = () => new NewOption(None$1);
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
        return unwrap$1(this.inner);
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
        return this.do(eq$1(other, by));
    }
    match(onSome, onNone) {
        return this.do(match$1(onSome, onNone));
    }
}
const Some = NewOption.Some;
const None = NewOption.None;

const tagOK = "Ok";
const tagErr = "Err";

function isOk(result) {
    return result.type === tagOK;
}

function isErr(result) {
    return result.type === tagErr;
}

function createAggregator$1(fn) {
    return (option, inner) => fn(option, inner);
}

function debug(inner, { ok = (v) => v, err = (e) => e } = {}) {
    return `Result.${inner.type}(${isOk(inner) ? ok(inner.value) : err(inner.err)})`;
}

function unwrap() {
    return createAggregator$1((_, inner) => {
        if (isErr(inner)) {
            throw new Error(`unwrap() on ${debug(inner)}`);
        }
        return inner.value;
    });
}

function unwrapErr() {
    return createAggregator$1((_, inner) => {
        if (isOk(inner)) {
            throw new Error(`unwrapErr called on ${debug(inner)}`);
        }
        return inner.err;
    });
}

function eq(other) {
    return createAggregator$1((_, inner) => {
        if (isOk(inner) && inner.type === other.inner.type) {
            return inner.value === other.inner.value;
        }
        if (isErr(inner) && inner.type === other.inner.type) {
            return inner.err === other.inner.err;
        }
        return false;
    });
}

function unwrapOr(default_value) {
    return createAggregator$1((_, inner) => {
        return isOk(inner) ? inner.value : default_value;
    });
}

function unwrapErrOr(defaultErr) {
    return createAggregator$1((_, inner) => {
        return isErr(inner) ? inner.err : defaultErr;
    });
}

function match(onOk, onErr) {
    return createAggregator$1((_, inner) => {
        if (isOk(inner)) {
            return onOk(inner.value);
        }
        return onErr(inner.err);
    });
}

class ResultNew {
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
const Ok = ResultNew.Ok;
const Err = ResultNew.Err;

function createRemapper$1(fn) {
    return (iter, source, inner) => new Iter(() => fn(iter, source, inner));
}

function enumerate() {
    return createRemapper$1(function* (_, source) {
        let index = 0;
        for (const item of source()) {
            yield { item, index };
            index += 1;
        }
    });
}

function map$1(fn) {
    return createRemapper$1(function* (_, source) {
        for (const item of source()) {
            yield fn(item);
        }
    });
}

function next(source) {
    const nextValue = source.next();
    if (nextValue.done) {
        return NewOption.None();
    }
    else {
        return NewOption.Some(nextValue.value);
    }
}

function take(takeAmount) {
    return createRemapper$1(function* (_, source) {
        let i = 0;
        for (const item of source()) {
            if (i++ < takeAmount) {
                yield item;
            }
            else {
                return;
            }
        }
    });
}

class Iter {
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
            .do(map$1(({ index }) => index + from));
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

class AnyHow {
    err;
    ctx;
    constructor(err, ctx = []) {
        this.err = err;
        this.ctx = ctx;
    }
    static msg(msg) {
        return new AnyHow(msg);
    }
    static expect(expected, got) {
        return AnyHow.msg(`Expected ${expected}, got: ${got}`);
    }
    wrapWith(msgFn) {
        return new AnyHow(this.err, this.ctx.concat(msgFn()));
    }
    toString() {
        const report = [this.err.toString()].concat(this.ctx);
        return report.join("\n");
    }
    toErr() {
        return Err(this);
    }
}

function createAggregator(fn) {
    return (iter, source, inner) => fn(iter, source, inner);
}

function filterMap(fn) {
    return createRemapper$1(function* (_, source) {
        for (const item of source()) {
            const data = fn(item).inner;
            if (isSome(data)) {
                yield data.value;
            }
        }
    });
}

function findMap(fn) {
    return createAggregator((iter) => {
        return iter.do(filterMap(fn)).next();
    });
}

function Pipe(identity, 
// eslint-disable-next-line @typescript-eslint/ban-types
members = []) {
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

function createRemapper(fn) {
    return (option, inner) => fn(option, inner);
}

function andThen(otherResult) {
    return createRemapper((_, inner) => {
        if (isOk(inner)) {
            return otherResult(inner.value);
        }
        return ResultNew.Err(inner.err);
    });
}

function map(fn) {
    return createRemapper((_, inner) => {
        if (isOk(inner)) {
            return ResultNew.Ok(fn(inner.value));
        }
        else {
            return ResultNew.Err(inner.err);
        }
    });
}

function SchemaCustom(createFn, flags = { isOptional: false }, rules = [], transforms = Pipe((v) => v)) {
    const validate = (v) => Iter.from(rules)
        .do(enumerate())
        .do(findMap(({ index, item }) => item(v) ? NewOption.None() : NewOption.Some(index)))
        .match((index) => AnyHow.msg(`Rule ${index} failed`).toErr(), () => Ok(v));
    const api = {
        transform(checkFn) {
            return SchemaCustom(createFn, flags, rules, transforms.clone().chain((v) => v.do(andThen(checkFn))));
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
                return NewOption.fromNullable(v).match((v) => validateAndTransform.call(v).do(map(NewOption.Some)), () => Ok(NewOption.None()));
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
        for (const { index, item } of Iter.from(items).do(enumerate())) {
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
function regexp(re, kind, value) {
    if (re.test(value)) {
        return Ok(value);
    }
    return AnyHow.expect(kind, value).toErr();
}
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
            if (Object.prototype.hasOwnProperty.call(matcher, currentTag)) {
                const fn = matcher[currentTag];
                if (typeof fn === "function") {
                    return NewOption.Some(fn(value));
                }
            }
            return NewOption.None();
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
            const result = tagSchema.parse(v).inner;
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
            if (Object.prototype.hasOwnProperty.call(schema, tag)) {
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
        const parsedKey = keySchema.parse(key).inner;
        if (isErr(parsedKey)) {
            return parsedKey.err.toErr();
        }
        const parsedValue = valueSchema.parse(value).inner;
        if (parsedValue.type === "Err") {
            return parsedValue.err
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
exports.Iter = Iter;
exports.NewOption = NewOption;
exports.None = None;
exports.Ok = Ok;
exports.Pipe = Pipe;
exports.ResultNew = ResultNew;
exports.Schema = Schema;
exports.Some = Some;

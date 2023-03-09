import { Left, Right } from "../either";
export function create_option(v) {
    let inner = v;
    const api = {
        inner: () => inner,
        eq: (value, by) => OptionApi.eq(api, value, by),
        format: () => OptionApi.format(inner),
        clone: () => OptionApi.clone(inner),
        unwrap: () => OptionApi.unwrap(inner),
        unwrapOr: (default_value) => OptionApi.unwrapOr(inner, default_value),
        isNone: () => OptionApi.isNone(inner),
        isSome: () => OptionApi.isSome(inner),
        take: () => OptionApi.take(inner),
        isSomeAnd: (fn) => OptionApi.isSomeAnd(api, fn),
        map: (fn) => OptionApi.map(inner, fn),
        or: (new_value) => OptionApi.or(api, new_value),
        orElse: (fn) => OptionApi.orElse(api, fn),
        and: (new_value) => OptionApi.and(api, new_value),
        andThen: (fn) => OptionApi.andThen(api, fn),
        toLeft: (fn) => OptionApi.toLeft(api, fn),
        toRight: (fn) => OptionApi.toRight(api, fn),
    };
    return api;
}
export function Some(value) {
    return create_option({ type: "Some", value });
}
export function None() {
    return create_option({ type: "None" });
}
export var OptionApi;
(function (OptionApi) {
    function format(option) {
        return option.type === "Some" ? `Some(${option.value})` : `None`;
    }
    OptionApi.format = format;
    function eq(option, value, by = (x) => x) {
        if (value.isNone() || option.isNone()) {
            return value.isNone() && option.isNone();
        }
        return by(value.unwrap()) === by(option.unwrap());
    }
    OptionApi.eq = eq;
    function clone(option) {
        return option.type === "Some" ? Some(option.value) : None();
    }
    OptionApi.clone = clone;
    function isNone(option) {
        return option.type === "None";
    }
    OptionApi.isNone = isNone;
    function isSome(option) {
        return option.type === "Some";
    }
    OptionApi.isSome = isSome;
    function take(option) {
        if (option.type === "Some") {
            option.type = "None";
            const value = option.value;
            option.value = undefined;
            return Some(value);
        }
        return None();
    }
    OptionApi.take = take;
    function isSomeAnd(option, fn) {
        return option.isSome() && fn(option.unwrap());
    }
    OptionApi.isSomeAnd = isSomeAnd;
    function unwrap(option) {
        if (option.type === "None") {
            throw new Error(`unwrap called on ${format(option)}`);
        }
        return option.value;
    }
    OptionApi.unwrap = unwrap;
    function unwrapOr(option, default_value) {
        return option.type === "None" ? default_value : option.value;
    }
    OptionApi.unwrapOr = unwrapOr;
    function map(option, fn) {
        if (option.type === "Some") {
            return Some(fn(unwrap(option)));
        }
        return None();
    }
    OptionApi.map = map;
    function or(current_value, new_value) {
        return current_value.isSome() ? current_value.clone() : new_value;
    }
    OptionApi.or = or;
    function orElse(option, fn) {
        return option.isSome() ? option.clone() : fn();
    }
    OptionApi.orElse = orElse;
    function and(current_value, new_value) {
        return current_value.isSome() ? new_value : None();
    }
    OptionApi.and = and;
    function andThen(option, fn) {
        return option.isSome() ? fn(option.unwrap()) : None();
    }
    OptionApi.andThen = andThen;
    function toLeft(option, right_default) {
        return option.isSome() ? Left(option.unwrap()) : Right(right_default());
    }
    OptionApi.toLeft = toLeft;
    function toRight(option, left_default) {
        return option.isSome() ? Right(option.unwrap()) : Left(left_default());
    }
    OptionApi.toRight = toRight;
})(OptionApi || (OptionApi = {}));

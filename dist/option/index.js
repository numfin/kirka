export * from "./interfaces";
export { OptionFrom } from "./from";
import { result } from "./api/result";
import { andThen } from "./api/andThen";
import { and } from "./api/and";
import { orElse } from "./api/orElse";
import { or } from "./api/or";
import { map } from "./api/map";
import { unwrapOr } from "./api/unwrapOr";
import { unwrap } from "./api/unwrap";
import { isSomeAnd } from "./api/isSomeAnd";
import { take } from "./api/take";
import { isSome } from "./api/isSome";
import { isNone } from "./api/isNone";
import { clone } from "./api/clone";
import { eq } from "./api/eq";
import { format } from "./api/format";
import { unionNone } from "./api/unionNone";
import { unionSome } from "./api/unionSome";
import { filter } from "./api/filter";
import { isNoneAnd } from "./api/isNoneAnd";
export function createOption(v) {
    let inner = v;
    const api = {
        inner: () => inner,
        eq: (value, by) => eq(api, value, by),
        format: (formatter) => format(api, formatter),
        clone: () => createOption(clone(inner)),
        unwrap: () => unwrap(api),
        unwrapOr: (default_value) => unwrapOr(inner, default_value),
        isNone: () => isNone(inner),
        isSome: () => isSome(inner),
        take: () => createOption(take(inner)),
        isSomeAnd: (fn) => isSomeAnd(api, fn),
        isNoneAnd: (fn) => isNoneAnd(api, fn),
        map: (fn) => createOption(map(api, fn)),
        or: (new_value) => createOption(or(api, new_value)),
        orElse: (fn) => createOption(orElse(api, fn)),
        and: (new_value) => createOption(and(api, new_value)),
        andThen: (fn) => createOption(andThen(api, fn)),
        result: (fn) => result(api, fn),
        filter: (fn) => filter(api, fn),
    };
    return api;
}
export function Some(v) {
    return createOption(unionSome(v));
}
export function None() {
    return createOption(unionNone());
}

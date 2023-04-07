export * from "./interfaces.js";
export { OptionFrom } from "./from/index.js";
import { result } from "./api/result.js";
import { andThen } from "./api/andThen.js";
import { and } from "./api/and.js";
import { orElse } from "./api/orElse.js";
import { or } from "./api/or.js";
import { map } from "./api/map.js";
import { unwrapOr } from "./api/unwrapOr.js";
import { unwrap } from "./api/unwrap.js";
import { isSomeAnd } from "./api/isSomeAnd.js";
import { take } from "./api/take.js";
import { isSome } from "./api/isSome.js";
import { isNone } from "./api/isNone.js";
import { clone } from "./api/clone.js";
import { eq } from "./api/eq.js";
import { format } from "./api/format.js";
import { unionNone } from "./api/unionNone.js";
import { unionSome } from "./api/unionSome.js";
import { filter } from "./api/filter.js";
import { isNoneAnd } from "./api/isNoneAnd.js";
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

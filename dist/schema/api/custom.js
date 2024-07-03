import { AnyHow } from "../../anyhow/index.js";
import { Iter, NewOption, Ok } from "../../index.js";
import { enumerate } from "../../iter/api/enumerate.js";
import { findMap } from "../../iter/api/find_map.js";
import { Pipe } from "../../pipe/index.js";
import { andThen } from "../../result/api/andThen.js";
import { map } from "../../result/api/map.js";
export function SchemaCustom(createFn, flags = { isOptional: false }, rules = [], transforms = Pipe((v) => v)) {
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

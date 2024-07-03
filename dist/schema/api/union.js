import { AnyHow } from "../../anyhow/index.js";
import { NewOption, Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
export function Union(_unionSchemas) {
    return new Proxy({}, {
        get(_, tag) {
            return (v) => UnionInstance(tag, v);
        },
    });
}
export function UnionInstance(currentTag, value) {
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
export const SchemaUnion = (schema) => SchemaUnionInternal(schema, defaultVahter(schema));

import { AnyHow } from "../../anyhow/index.js";
import { IterFrom, None, Some } from "../../index.js";
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
        return IterFrom.array(Object.entries(unionSchemas))
            .findMap(([tag, schema]) => schema
            .parse(v)
            .map((parsedValue) => UnionInstance(tag, parsedValue))
            .ok())
            .result(() => AnyHow.expect("renum", String(v)));
    });
}
function SchemaUnionInternal(schema, vahter = defaultVahter(schema)) {
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
export const SchemaUnion = (schema) => SchemaUnionInternal(schema);

import { AnyHow } from "../../anyhow/index.js";
import { Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter(schema) {
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
        const parsedObj = {};
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
export function SchemaDict(schema, vahter = defaultVahter(schema)) {
    const api = {
        optional() {
            return SchemaDict(schema, vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaDict(schema, vahter.is(fn));
        },
        transform(fn) {
            return SchemaDict(schema, vahter.transform(fn));
        },
    };
    return api;
}

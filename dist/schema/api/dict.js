import { AnyHow } from "../../anyhow/index.js";
import { Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter(schema, options) {
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
export const SchemaDict = (schema, options) => SchemaDictInternal(defaultVahter(schema, {
    trimExtra: options?.trimExtra ?? true,
}));

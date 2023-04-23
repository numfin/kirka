import { AnyHow } from "../../anyhow/index.js";
import { Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter() {
    return SchemaCustom((v) => {
        if (typeof v !== "boolean") {
            return AnyHow.expect("boolean", typeof v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
export function SchemaBool(vahter = defaultVahter()) {
    const api = {
        optional() {
            return SchemaBool(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaBool(vahter.is(fn));
        },
        transform(fn) {
            return SchemaBool(vahter.transform(fn));
        },
    };
    return api;
}

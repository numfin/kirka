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
export const SchemaBool = () => SchemaBoolInternal(defaultVahter());

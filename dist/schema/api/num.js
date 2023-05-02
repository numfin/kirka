import { AnyHow } from "../../anyhow/index.js";
import { Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter() {
    return SchemaCustom((v) => {
        if (typeof v !== "number") {
            return AnyHow.expect("number", typeof v).toErr();
        }
        else if (isNaN(v)) {
            return AnyHow.expect("number", v).toErr();
        }
        else if (!isFinite(v)) {
            return AnyHow.expect("finite number", v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
function SchemaNumInternal(vahter) {
    const api = {
        optional() {
            return SchemaNumInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaNumInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaNumInternal(vahter.transform(fn));
        },
    };
    return api;
}
export const SchemaNum = () => SchemaNumInternal(defaultVahter());

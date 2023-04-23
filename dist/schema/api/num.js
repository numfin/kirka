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
export function SchemaNum(vahter = defaultVahter()) {
    const api = {
        optional() {
            return SchemaNum(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaNum(vahter.is(fn));
        },
        transform(fn) {
            return SchemaNum(vahter.transform(fn));
        },
    };
    return api;
}

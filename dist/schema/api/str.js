import { AnyHow } from "../../anyhow/index.js";
import { Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter(equalTo) {
    return SchemaCustom((v) => {
        if (typeof v !== "string") {
            return AnyHow.expect("string", typeof v).toErr();
        }
        else if (typeof equalTo === "string") {
            return v === equalTo ? Ok(v) : AnyHow.expect(equalTo, v).toErr();
        }
        else {
            return Ok(v);
        }
    });
}
function SchemaStrInternal(vahter) {
    const api = {
        optional() {
            return SchemaStrInternal(vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaStrInternal(vahter.is(fn));
        },
        transform(fn) {
            return SchemaStrInternal(vahter.transform(fn));
        },
        max(len) {
            return SchemaStrInternal(vahter.is((v) => v.length <= len));
        },
        min(len) {
            return SchemaStrInternal(vahter.is((v) => v.length >= len));
        },
        numeric() {
            return api.re(() => /^\d*$/gmu, "numeric string");
        },
        alphabetic() {
            return api.re(() => /^[\p{Letter}\p{Mark}]*$/gmu, "alphabetic string");
        },
        alphanumeric() {
            return api.re(() => /^[\p{Letter}\p{Mark}\d]*$/gmu, "alphanumeric string");
        },
        re(re, kind) {
            return SchemaStrInternal(vahter.transform((v) => {
                const invokedRe = re();
                return regexp(invokedRe, kind ?? invokedRe.source, v);
            }));
        },
    };
    return api;
}
function regexp(re, kind, value) {
    if (re.test(value)) {
        return Ok(value);
    }
    return AnyHow.expect(kind, value).toErr();
}
export const SchemaStr = (equalTo) => SchemaStrInternal(defaultVahter(equalTo));

import { AnyHow } from "../../anyhow/index.js";
import { IterFrom, Ok } from "../../index.js";
import { SchemaCustom } from "./custom.js";
function defaultVahter(schema) {
    return SchemaCustom((items) => {
        if (!Array.isArray(items)) {
            return AnyHow.expect("array", String(items)).toErr();
        }
        const parsedArr = [];
        for (const { index, item } of IterFrom.array(items).enumerate()) {
            const result = schema.parse(item);
            if (result.isOk()) {
                parsedArr.push(result.unwrap());
            }
            else {
                return result
                    .unwrapErr()
                    .wrapWith(() => `Array item#${index}`)
                    .toErr();
            }
        }
        return Ok(parsedArr);
    });
}
export function SchemaArr(schema, vahter = defaultVahter(schema)) {
    const api = {
        optional() {
            return SchemaArr(schema, vahter.optional());
        },
        parse(v) {
            return vahter.parse(v);
        },
        check(v) {
            return vahter.check(v);
        },
        is(fn) {
            return SchemaArr(schema, vahter.is(fn));
        },
        transform(fn) {
            return SchemaArr(schema, vahter.transform(fn));
        },
    };
    return api;
}

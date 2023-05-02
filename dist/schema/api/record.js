import { Ok } from "../../index.js";
import { SchemaDict } from "./dict.js";
export const SchemaRecord = (keySchema, valueSchema) => SchemaDict({}, {
    trimExtra: false,
}).transform((v) => {
    const result = {};
    for (const [key, value] of Object.entries(v)) {
        const parsedKey = keySchema.parse(key).inner();
        if (parsedKey.type === "Err") {
            return parsedKey.value.toErr();
        }
        const parsedValue = valueSchema.parse(value).inner();
        if (parsedValue.type === "Err") {
            return parsedValue.value
                .wrapWith(() => `Invalid value for key: ${key}`)
                .toErr();
        }
        result[parsedKey.value] = parsedValue.value;
    }
    return Ok(result);
});

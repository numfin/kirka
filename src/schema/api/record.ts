import { Ok } from "../../index.js";
import { isErr } from "../../result/api/isErr.js";
import { Schema } from "../interface.js";
import { SchemaDict } from "./dict.js";

export const SchemaRecord = <Key extends PropertyKey, Value>(
  keySchema: Schema<Key>,
  valueSchema: Schema<Value>
) =>
  SchemaDict<Record<Key, Value>>({} as Record<Key, Schema<Value>>, {
    trimExtra: false,
  }).transform((v) => {
    const result = {} as Record<Key, Value>;
    for (const [key, value] of Object.entries(v)) {
      const parsedKey = keySchema.parse(key).inner;
      if (isErr(parsedKey)) {
        return parsedKey.err.toErr();
      }
      const parsedValue = valueSchema.parse(value).inner;
      if (parsedValue.type === "Err") {
        return parsedValue.err
          .wrapWith(() => `Invalid value for key: ${key}`)
          .toErr();
      }
      result[parsedKey.value] = parsedValue.value;
    }
    return Ok(result);
  });

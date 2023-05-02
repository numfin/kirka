import { Schema } from "../interface.js";
import { SchemaDict } from "./dict.js";
export declare const SchemaRecord: <Key extends PropertyKey, Value>(keySchema: Schema<Key>, valueSchema: Schema<Value>) => SchemaDict<Record<Key, Value>, Record<Key, Value>>;
//# sourceMappingURL=record.d.ts.map
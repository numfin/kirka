import test from "ava";
import { Schema } from "../index.js";
import { NewOption } from "../../index.js";
test("Contains hashmap structure", (t) => {
    const schema = Schema.record(Schema.str(), Schema.num().optional());
    const result = schema.parse({ a: 3, b: 4 }).unwrap();
    t.true(result.a.eq(NewOption.Some(3)));
    t.true(result.b.eq(NewOption.Some(4)));
    const resultEmpty = schema.parse({}).unwrap();
    t.is(Object.values(resultEmpty).length, 0);
});

import test from "ava";
import { Err, Ok } from "../../index.js";
import { intoIter } from "./intoIter.js";
import { toArray } from "../../iter/api/to_array.js";

test("Ok().intoIter()", (t) => {
  t.deepEqual(Ok(3).do(intoIter()).do(toArray()), [3]);
});
test("Err().intoIter()", (t) => {
  t.deepEqual(Err(3).do(intoIter()).do(toArray()), []);
});

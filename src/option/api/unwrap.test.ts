import test from "ava";
import { NewOption } from "../../index.js";

test(`Some.unwrap() returns inner value`, (t) => {
  t.is(NewOption.Some(3).unwrap(), 3);
});
test(`None.unwrap() throws error`, (t) => {
  t.throws(NewOption.None().unwrap);
});

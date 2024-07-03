import test from "ava";
import { NewOption } from "../index.js";
import { isNone } from "./is_none.js";

test(`isNone() truthy on None`, (t) => {
  t.truthy(isNone(NewOption.None().inner));
});

test(`isNone() falsy on Some`, (t) => {
  t.falsy(isNone(NewOption.Some(false).inner));
});

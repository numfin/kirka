import test from "ava";
import { NewOption } from "../index.js";
import { isSome } from "./is_some.js";

test(`isSome() truthy on Some`, (t) => {
  t.truthy(isSome(NewOption.Some(false).inner));
});

test(`isSome() falsy on None`, (t) => {
  t.falsy(isSome(NewOption.None().inner));
});

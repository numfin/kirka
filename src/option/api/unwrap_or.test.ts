import test from "ava";
import { NewOption } from "../../index.js";
import { unwrapOr } from "./unwrap_or.js";

test(`Some(x).unwrapOr()`, (t) => {
  t.is(NewOption.Some(3).do(unwrapOr(4)), 3);
});

test(`None.unwrapOr()`, (t) => {
  t.is(NewOption.None<number>().do(unwrapOr(4)), 4);
});

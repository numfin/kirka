import test from "ava";
import { Err, Ok } from "../../index.js";
import { unwrapErrOr } from "./unwrapErrOr.js";

test(`.unwrapErrOr()`, (t) => {
  const or2 = unwrapErrOr(2);
  t.is(Ok<string, number>("ok").do(or2), 2);
  t.is(Err(1).do(or2), 1);
});

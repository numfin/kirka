import test from "ava";
import { NewOption } from "../../index.js";
import { format } from "./format.js";

test(`format() returns formatted option`, (t) => {
  t.is(NewOption.Some(3).do(format()), `Some(3)`);
  t.is(NewOption.None<string>().do(format()), `None`);
});

test(`format() typecheck: should work only on types with ToString()`, (t) => {
  // @ts-expect-error
  NewOption.None().do(format());
  t.pass();
});

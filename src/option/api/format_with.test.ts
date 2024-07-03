import test from "ava";
import { NewOption } from "../../index.js";
import { formatWith } from "./format_with.js";

test(`formatWith() returns formatted option`, (t) => {
  t.is(NewOption.Some(3).do(formatWith((v) => v * 2)), `Some(6)`);
  t.is(NewOption.None<string>().do(formatWith((_) => "hi")), `None`);
});

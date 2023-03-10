import test from "ava";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.bool()`, (t) => {
  t.true(OptionFrom.bool(true).eq(Some(true)));
  t.true(OptionFrom.bool(false).eq(None()));
});

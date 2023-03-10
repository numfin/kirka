import test from "ava";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.nullable()`, (t) => {
  t.true(OptionFrom.nullable(null).eq(None()));
  t.true(OptionFrom.nullable(undefined).eq(None()));
  t.true(OptionFrom.nullable(3).eq(Some(3)));
});

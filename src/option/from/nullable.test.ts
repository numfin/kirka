import test from "ava";
import { None, OptionFrom, Some } from "../index.js";

test(`OptionFrom.nullable()`, (t) => {
  t.true(OptionFrom.nullable(null).eq(None()));
  t.true(OptionFrom.nullable(undefined).eq(None()));
  t.true(OptionFrom.nullable(3).eq(Some(3)));
});

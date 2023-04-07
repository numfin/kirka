import test from "ava";
import { None, Some } from "../index.js";
import { OptionFrom } from "./index.js";

test(`OptionFrom.bool()`, (t) => {
  t.true(OptionFrom.bool(true).eq(Some(true)));
  t.true(OptionFrom.bool(false).eq(None()));
});

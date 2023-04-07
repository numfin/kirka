import test from "ava";
import { Err, Ok } from "../../result/index.js";
import { None, Some } from "../index.js";
import { OptionFrom } from "./index.js";

test(`OptionFrom.ok()`, (t) => {
  t.true(OptionFrom.ok(Err<string, number>(3)).eq(None()));
  t.true(OptionFrom.ok(Ok<string, number>("value")).eq(Some("value")));
});

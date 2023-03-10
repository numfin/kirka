import test from "ava";
import { Err, Ok } from "../../result";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.ok()`, (t) => {
  t.true(OptionFrom.ok(Err<string, number>(3)).eq(None()));
  t.true(OptionFrom.ok(Ok<string, number>("value")).eq(Some("value")));
});

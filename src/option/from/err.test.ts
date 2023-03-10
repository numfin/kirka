import test from "ava";
import { Err, Ok } from "../../result";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.err()`, (t) => {
  t.true(OptionFrom.err(Ok<number, string>(3)).eq(None()));
  t.true(OptionFrom.err(Err<number, string>("err")).eq(Some("err")));
});

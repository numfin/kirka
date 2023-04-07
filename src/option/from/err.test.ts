import test from "ava";
import { OptionFrom } from "./index.js";
import { Err, None, Ok, Some } from "../../index.js";

test(`OptionFrom.err()`, (t) => {
  t.true(OptionFrom.err(Ok<number, string>(3)).eq(None()));
  t.true(OptionFrom.err(Err<number, string>("err")).eq(Some("err")));
});

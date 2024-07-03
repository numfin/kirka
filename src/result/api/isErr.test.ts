import test from "ava";
import { Err, Ok } from "../../index.js";
import { isErr } from "./isErr.js";

test(`.isErr()`, (t) => {
  t.false(isErr(Ok(3).inner));
  t.true(isErr(Err(3).inner));
});

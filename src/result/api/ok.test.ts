import test from "ava";
import { Err, NewOption, Ok } from "../../index.js";
import { ok } from "./ok.js";

test(`.ok()`, (t) => {
  t.true(Err(3).do(ok()).eq(NewOption.None()));
  t.true(Ok(3).do(ok()).eq(NewOption.Some(3)));
});

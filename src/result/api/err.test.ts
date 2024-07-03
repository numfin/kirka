import test from "ava";
import { Err, NewOption, Ok } from "../../index.js";
import { err } from "./err.js";

test(`.err()`, (t) => {
  t.true(Ok(3).do(err()).eq(NewOption.None()));
  t.true(Err(3).do(err()).eq(NewOption.Some(3)));
});

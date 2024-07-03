import test from "ava";
import { Err, Ok } from "../../index.js";
import { isOk } from "./isOk.js";

test(`.isOk()`, (t) => {
  t.false(isOk(Err(3).inner));
  t.true(isOk(Ok(3).inner));
});

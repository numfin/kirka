import test from "ava";
import { Err, Ok } from "../../index.js";
import { isOkAnd } from "./isOkAnd.js";

test(`.isOkAnd()`, (t) => {
  t.false(Err(3).do(isOkAnd((_) => true)));
  t.false(Err(3).do(isOkAnd((_) => false)));
  t.true(Ok(3).do(isOkAnd((_) => true)));
  t.false(Ok(3).do(isOkAnd((_) => false)));
});

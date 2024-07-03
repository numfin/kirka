import test from "ava";
import { Err, Ok } from "../../index.js";
import { debug } from "./debug.js";

test(`.debug()`, (t) => {
  t.is(debug(Err(3).inner), `Result.Err(3)`);
  t.is(debug(Ok(3).inner), `Result.Ok(3)`);
  t.is(debug(Err(3).inner, { err: (e) => `${e * 2}` }), `Result.Err(6)`);
  t.is(debug(Ok(3).inner, { ok: (v) => `${v * 2}` }), `Result.Ok(6)`);
});

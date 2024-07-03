import test from "ava";
import { Err, Ok } from "../../index.js";
import { tryFn } from "./try-fn.js";

test(`.tryFn()`, (t) => {
  const err = new Error("Oh no");
  t.true(
    tryFn(() => {
      throw err;
    }).eq(Err(err))
  );
  t.true(tryFn(() => "good").eq(Ok("good")));
});

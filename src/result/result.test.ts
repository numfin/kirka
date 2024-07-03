import test from "ava";
import { Err, Ok, ResultNew } from "./index.js";

test(`.[Symbol.iterator]()`, (t) => {
  t.deepEqual(Array.from(Ok("v")), ["v"]);
  t.deepEqual(Array.from(Err("err")), []);
});

test(`ResultFrom.tryFn()  Throw`, (t) => {
  const err = new Error("testing");
  const result = ResultNew.tryFn(() => {
    throw err;
  });
  t.true(result.isErr());
  t.true(result.eq(Err(err)));
  t.not(result.unwrapErr(), new Error("another error"));
});
test(`ResultFrom.fallible()  Ok`, (t) => {
  const result = ResultNew.tryFn(() => 3);
  t.is(result.unwrap(), 3);
});
test(`ResultFrom.fallibleAsync() Throw`, async (t) => {
  const err = new Error("testing");
  const result = await ResultNew.tryAsync(() => {
    throw err;
  });

  t.true(result.isErr());
  t.true(result.eq(Err(err)));
  t.not(result.unwrapErr(), new Error("another error"));
});
test(`ResultFrom.fallibleAsync()  Ok`, async (t) => {
  const result = await ResultNew.tryAsync(async () => 3);
  t.is(result.unwrap(), 3);
});

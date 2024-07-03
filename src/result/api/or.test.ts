import test from "ava";
import { Err, Ok } from "../../index.js";
import { or } from "./or.js";

test(`.or()`, (t) => {
  const resultOk = Ok<number, number>(3);
  t.true(resultOk.do(or(Ok<number, string>(6))).eq(Ok(3)));
  t.true(resultOk.do(or(Err(6))).eq(Ok(3)));

  const resultErr = Err<number, number>(4);
  t.true(resultErr.do(or(Ok<number, string>(8))).eq(Ok(8)));
  t.true(resultErr.do(or(Err(8))).eq(Err(8)));
});

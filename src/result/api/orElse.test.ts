import test from "ava";
import { Err, Ok } from "../../index.js";
import { orElse } from "./orElse.js";

test(`Ok().orElse()`, (t) => {
  const rok = Ok<number, number>(3);
  // notice we changed type of Err() from number to string
  t.true(rok.do(orElse((e) => Ok<number, string>(e * 2))).eq(Ok(3)));
  t.true(rok.do(orElse((e) => Err(e * 2))).eq(Ok(3)));
});

test(`Err().orElse()`, (t) => {
  const rerr = Err<number, number>(4);
  t.true(rerr.do(orElse((e) => Ok<number, string>(e * 2))).eq(Ok(8)));
  t.true(rerr.do(orElse((e) => Err(e * 2))).eq(Err(8)));
});

import test from "ava";
import { Err, Ok } from "../../index.js";
import { andThen } from "./andThen.js";

test(`Err().andThen()`, (t) => {
  const err1 = Err<number, number>(3);

  t.is(err1.do(andThen((v) => Err(v * 2))).unwrapErr(), 3);
  t.is(err1.do(andThen((v) => Ok("value"))).unwrapErr(), 3);
});

test(`Ok().andThen()`, (t) => {
  const ok = Ok<number, number>(4);
  t.is(ok.do(andThen((v) => Err(v * 2))).unwrapErr(), 8);
  t.is(ok.do(andThen((_) => Ok("value"))).unwrap(), "value");
});

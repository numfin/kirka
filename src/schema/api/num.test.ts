import test from "ava";
import { None, Ok, Schema, Some } from "../../index.js";

test("Can check if value is number", (t) => {
  let s = Schema.num();
  t.true(s.check(-3));
  t.true(s.check(0));
  t.true(s.check(3));
  t.false(s.check("3"));
  t.false(s.check(NaN));
  t.false(s.check(Infinity));
  t.false(s.check(null));
});

test("Can extract value", (t) => {
  let s = Schema.num();
  t.true(s.parse(-3).eq(Ok(-3)));
  t.true(s.parse(0).eq(Ok(0)));
  t.true(s.parse(3).eq(Ok(3)));
});
test("Can extract optional value", (t) => {
  let s = Schema.num().optional();
  t.true(s.parse(-3).unwrap().eq(Some(-3)));
  t.true(s.parse(0).unwrap().eq(Some(0)));
  t.true(s.parse(3).unwrap().eq(Some(3)));
  t.true(s.parse(null).unwrap().eq(None()));
  t.true(s.parse(undefined).unwrap().eq(None()));
  t.true(s.parse(NaN).isErr());
  t.true(s.parse(Infinity).isErr());
});
test("Can validate value", (t) => {
  let s = Schema.num().is((v) => v > 5);
  t.true(s.parse(1).isErr());
  t.true(s.parse(6).eq(Ok(6)));
  let so = s.optional();
  t.true(so.parse(1).isErr());
  t.true(so.parse(6).unwrap().eq(Some(6)));
});
test("Can transform value", (t) => {
  let s = Schema.num();
  let s1 = s.transform((v) => Ok(v * 2));
  t.is(s1.parse(3).unwrap(), 6);
  let s2 = s.optional().transform((v) => Ok(v * 3));
  t.is(s2.parse(3).unwrap().unwrap(), 9);
});

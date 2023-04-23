import test from "ava";
import { None, Ok, Some } from "../../index.js";
import { SchemaBool } from "./bool.js";

test("Can check if value is boolean", (t) => {
  let s = SchemaBool();
  t.true(s.check(true));
  t.true(s.check(false));
  t.false(s.check("0"));
  t.false(s.check(0));
  t.false(s.check(NaN));
  t.false(s.check(Infinity));
  t.false(s.check(null));
  t.false(s.check(undefined));
});

test("Can extract value", (t) => {
  let s = SchemaBool();
  t.true(s.parse(true).eq(Ok(true)));
  t.true(s.parse(false).eq(Ok(false)));
});
test("Can extract optional value", (t) => {
  let s = SchemaBool().optional();
  t.true(s.parse(true).unwrap().eq(Some(true)));
  t.true(s.parse(false).unwrap().eq(Some(false)));
  t.true(s.parse(0).isErr());
  t.true(s.parse("").isErr());
  t.true(s.parse(null).unwrap().eq(None()));
  t.true(s.parse(undefined).unwrap().eq(None()));
});
test("Can validate value", (t) => {
  let s = SchemaBool().is((v) => v === true);
  t.true(s.parse(true).unwrap());
  t.true(s.parse(false).isErr());
  let so = s.optional();
  t.true(so.parse(true).unwrap().eq(Some(true)));
  t.true(so.parse(false).isErr());
});
test("Can transform value", (t) => {
  let s = SchemaBool();
  let s1 = s.transform((v) => Ok(!v));
  t.is(s1.parse(true).unwrap(), false);
  t.is(s1.parse(false).unwrap(), true);
  let s2 = s.optional().transform((v) => Ok(!v));
  t.true(s2.parse(true).unwrap().eq(Some(false)));
  t.true(s2.parse(false).unwrap().eq(Some(true)));
});

import test from "ava";
import { None, Ok, Some } from "../../index.js";
import { SchemaDict } from "./dict.js";
import { SchemaStr } from "./str.js";
import { SchemaNum } from "./num.js";
import { SchemaBool } from "./bool.js";

const genSchema = () =>
  SchemaDict({
    s: SchemaStr(),
    n: SchemaNum(),
    b: SchemaBool(),
  });

test("Contains dict structure", (t) => {
  let s = genSchema();
  t.deepEqual(s.parse({ s: "", n: 0, b: true }).unwrap(), {
    s: "",
    n: 0,
    b: true,
  });
});
test("Removes extra values", (t) => {
  let s = genSchema();
  t.deepEqual(s.parse({ s: "", n: 0, b: true, d: "" }).unwrap(), {
    s: "",
    n: 0,
    b: true,
  });
});
test("Checks if all fields are present", (t) => {
  let s = genSchema();
  t.true(s.parse({ s: "" }).isErr());
});
test("Optional fields replaced with Option<T>", (t) => {
  let so = SchemaDict({
    s: SchemaStr(),
    o: SchemaNum().optional(),
  });
  t.true(
    so.parse({ s: "" }).isOkAnd((v) => {
      return v.o.isNoneAnd(() => v.s === "");
    })
  );
  t.true(
    so.parse({ s: "", o: 3 }).isOkAnd((v) => {
      return v.o.eq(Some(3)) && v.s === "";
    })
  );
});

test("Can extract optional value", (t) => {
  let s = genSchema().optional();
  t.deepEqual(s.parse({ s: "", n: 0, b: true }).unwrap().unwrap(), {
    b: true,
    n: 0,
    s: "",
  });
  t.true(s.parse(null).unwrap().eq(None()));
  t.true(s.parse(undefined).unwrap().eq(None()));
});
test("Can validate value", (t) => {
  let s = genSchema().is((v) => v.n >= 5);
  t.deepEqual(s.parse({ s: "", n: 5, b: true }).unwrap(), {
    s: "",
    n: 5,
    b: true,
  });
  t.true(s.parse({ s: "", n: 4, b: true }).isErr());
  let so = s.optional();
  t.deepEqual(so.parse({ s: "", n: 5, b: true }).unwrap().unwrap(), {
    s: "",
    n: 5,
    b: true,
  });
  t.true(so.parse({ s: "", n: 4, b: true }).isErr());
});
test("Can transform value", (t) => {
  let s = genSchema().transform((v) => {
    v.n = v.n * 2;
    return Ok(v);
  });
  t.deepEqual(s.parse({ s: "", n: 4, b: true }).unwrap(), {
    s: "",
    n: 8,
    b: true,
  });
  let s2 = s.optional();
  t.deepEqual(s2.parse({ s: "", n: 4, b: true }).unwrap().unwrap(), {
    s: "",
    n: 8,
    b: true,
  });
});

test("Options.trimExtra", (t) => {
  const defaultSchema = SchemaDict<Record<string, string>>({
    a: SchemaStr(),
  });
  const falseTrimSchema = SchemaDict<Record<string, string>>(
    { a: SchemaStr() },
    { trimExtra: false }
  );
  t.deepEqual(defaultSchema.parse({ a: "hi", b: "hello" }).unwrap(), {
    a: "hi",
  });
  t.deepEqual(falseTrimSchema.parse({ a: "hi", b: "hello" }).unwrap(), {
    a: "hi",
    b: "hello",
  });
});

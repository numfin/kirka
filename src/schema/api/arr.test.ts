import test from "ava";
import { NewOption, Ok } from "../../index.js";
import { SchemaStr } from "./str.js";
import { SchemaArr } from "./arr.js";
import { isSomeAnd } from "../../option/api/is_some_and.js";
import { isOkAnd } from "../../result/api/isOkAnd.js";

const genSchema = () => SchemaArr(SchemaStr());

test("Contains array", (t) => {
  let s = SchemaArr(SchemaStr());
  t.deepEqual(s.parse([]).unwrap(), []);
  t.deepEqual(s.parse(["asd"]).unwrap(), ["asd"]);
  t.true(s.parse([3]).isErr());
  t.true(s.parse(["asd", 3]).isErr());
});
test("Optional values replaced with Option<T>", (t) => {
  let so = SchemaArr(SchemaStr().optional());
  t.true(
    so.parse([, "asd"]).do(
      isOkAnd((v) => {
        return v[0].isNone() && v[1].do(isSomeAnd((v) => v === "asd"));
      })
    )
  );
});

test("Can extract optional value", (t) => {
  let s = genSchema().optional();
  t.deepEqual(s.parse(["asd"]).unwrap().unwrap(), ["asd"]);
  t.true(s.parse(null).unwrap().eq(NewOption.None()));
  t.true(s.parse(undefined).unwrap().eq(NewOption.None()));
});
test("Can validate value", (t) => {
  let s = genSchema().is((v) => v.length > 2);
  t.deepEqual(s.parse(["a", "b", "c"]).unwrap(), ["a", "b", "c"]);
  t.true(s.parse(["a"]).isErr());
});
test("Can transform value", (t) => {
  let s = genSchema().transform((v) => {
    v.push("another");
    return Ok(v);
  });
  t.deepEqual(s.parse(["a"]).unwrap(), ["a", "another"]);
  let s2 = s.optional();
  t.deepEqual(s2.parse(["a"]).unwrap().unwrap(), ["a", "another"]);
});

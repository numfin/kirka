import test from "ava";
import { SchemaStr } from "./str.js";
import { SchemaNum } from "./num.js";
import { SchemaDict } from "./dict.js";
import { SchemaArr } from "./arr.js";
import { SchemaUnion, Union } from "./union.js";
import { Option, Some } from "../../index.js";
import { FromSchema } from "../interface.js";

test("Convert value to union", (t) => {
  const s = SchemaUnion({
    v1: SchemaStr<string>(),
    v2: SchemaNum<number>(),
    v3: SchemaNum<number>().optional(),
    v4: SchemaDict({
      f1: SchemaNum<number>(),
      f2: SchemaUnion({
        f2v1: SchemaArr(SchemaStr<string>()),
        f2v2: SchemaNum<number>(),
      }),
    }),
  });
  t.true(s.parse("asd").unwrap().is("v1"));
  t.true(s.parse(34).unwrap().is("v2"));
  t.true(s.parse(null).unwrap().is("v3"));
  t.true(
    s
      .parse({
        f1: 0,
        f2: ["hi"],
      })
      .unwrap()
      .is("v4")
  );
  t.true(
    s
      .parse({
        f1: 3,
        f2: 4,
      })
      .unwrap()
      .is("v4")
  );
});

test("match union", (t) => {
  const tUnion = SchemaUnion({
    v1: SchemaStr<string>(),
    v2: SchemaNum<number>(),
    v3: SchemaNum<number>().optional(),
  });
  const matcher = {
    v1(v: string) {
      t.is(v, "");
      return "v1";
    },
    v2(v: number) {
      t.is(v, 10);
      return "v2";
    },
    v3(v: Option<number>) {
      t.true(v.eq(Some(20)));
      return "v3";
    },
  };
  t.is(tUnion.v1("").match(matcher), "v1");
  t.is(tUnion.v2(10).match(matcher), "v2");
  t.is(tUnion.v3(Some(20)).match(matcher), "v3");
});
test("matchSome union", (t) => {
  const tUnion = SchemaUnion({
    v1: SchemaStr<string>(),
    v2: SchemaNum<number>(),
    v3: SchemaNum<number>().optional(),
  });
  const matcher = {
    v1(v: string) {
      t.is(v, "");
      return "v1";
    },
    v2(v: number) {
      t.is(v, 10);
      return "v2";
    },
    v3(v: Option<number>) {
      t.true(v.eq(Some(20)));
      return "v3";
    },
  };
  t.true(
    tUnion
      .v1("")
      .matchSome({
        v1: matcher.v1,
      })
      .eq(Some("v1"))
  );
  t.true(
    tUnion
      .v2(10)
      .matchSome({
        v2: matcher.v2,
      })
      .eq(Some("v2"))
  );
  t.true(
    tUnion
      .v3(Some(20))
      .matchSome({
        v3: matcher.v3,
      })
      .eq(Some("v3"))
  );
});

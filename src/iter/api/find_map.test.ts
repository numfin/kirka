import test from "ava";
import { Iter } from "../index.js";
import { None, Some } from "../../option/index.js";
import { findMap } from "./find_map.js";

test(`.findMap()`, (t) => {
  const iter = Iter.fromRange(0, 10);
  const valueIfEq = (to: number) => {
    return (v: number) => {
      return v === to ? Some("value") : None();
    };
  };

  t.true(iter.do(findMap(valueIfEq(5))).eq(Some("value")));
  t.true(iter.do(findMap(valueIfEq(100))).eq(None()));
});

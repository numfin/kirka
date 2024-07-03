import test from "ava";
import { Iter } from "../index.js";
import { findMap } from "./find_map.js";
import { NewOption } from "../../option/index.js";

test(`.findMap()`, (t) => {
  const iter = Iter.fromRange(0, 10);
  const valueIfEq = (to: number) => {
    return (v: number) => {
      return v === to ? NewOption.Some("value") : NewOption.None();
    };
  };

  t.true(iter.do(findMap(valueIfEq(5))).eq(NewOption.Some("value")));
  t.true(iter.do(findMap(valueIfEq(100))).eq(NewOption.None()));
});

import test from "ava";
import { Iter } from "../index.js";
import { any } from "./any.js";

test(`any() falsy if everything invalid`, (t) => {
  const numbers = Iter.from(["1", "2", "3", "4"]);
  t.false(numbers.do(any((v) => typeof v === "number")));
});

test(`any() truthy if at least one is valid`, (t) => {
  const firstValid = Iter.from([1, "2", "3", "4"]);
  const middleValid = Iter.from(["1", 2, "3", "4"]);
  const lastValid = Iter.from(["1", "2", "3", 4]);
  const isNumber = any((v) => typeof v === "number");

  t.true(firstValid.do(isNumber));
  t.true(middleValid.do(isNumber));
  t.true(lastValid.do(isNumber));
});

test(`any() falsy on empty sets`, (t) => {
  const notAllNumbers = Iter.from([]);
  t.false(notAllNumbers.do(any((_) => true)));
});

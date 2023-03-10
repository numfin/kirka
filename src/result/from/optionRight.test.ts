import test from "ava";
import { None, Some } from "../../option";
import { Left, Right } from "../index";
import { optionRight } from "./optionRight";

test(`EitherFrom.optionRight()`, (t) => {
  t.true(optionRight(Some(3), () => "value").eq(Right<string, number>(3)));
  t.true(optionRight(None(), () => "value").eq(Left<string, number>("value")));
});

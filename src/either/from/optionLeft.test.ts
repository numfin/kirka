import test from "ava";
import { None, Some } from "../../option";
import { Left, Right } from "../index";
import { optionLeft } from "./optionLeft";

test(`EitherFrom.optionLeft()`, (t) => {
  t.true(optionLeft(Some(3), () => "value").eq(Left<number, string>(3)));
  t.true(optionLeft(None(), () => "value").eq(Right<number, string>("value")));
});

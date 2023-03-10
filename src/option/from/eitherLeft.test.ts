import test from "ava";
import { Left, Right } from "../../either";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.eitherLeft()`, (t) => {
  t.true(OptionFrom.eitherLeft(Left<number, string>(3)).eq(Some(3)));
  t.true(OptionFrom.eitherLeft(Right<number, string>("value")).eq(None()));
});

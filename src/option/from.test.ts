import test from "ava";
import { Left, Right } from "../either";
import { OptionFrom } from "./from";
import { None, Some } from "./option";

test(`OptionFrom.bool()`, (t) => {
  t.true(OptionFrom.bool(true).eq(Some(true)));
  t.true(OptionFrom.bool(false).eq(None()));
});
test(`OptionFrom.nullable()`, (t) => {
  t.true(OptionFrom.nullable(null).eq(None()));
  t.true(OptionFrom.nullable(undefined).eq(None()));
  t.true(OptionFrom.nullable(3).eq(Some(3)));
});
test(`OptionFrom.eitherLeft()`, (t) => {
  t.true(OptionFrom.eitherLeft(Left<number, string>(3)).eq(Some(3)));
  t.true(OptionFrom.eitherLeft(Right<number, string>("value")).eq(None()));
});
test(`OptionFrom.eitherRight()`, (t) => {
  t.true(
    OptionFrom.eitherRight(Right<number, string>("value")).eq(Some("value"))
  );
  t.true(OptionFrom.eitherRight(Left<number, string>(3)).eq(None()));
});

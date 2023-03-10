import test from "ava";
import { Left, Right } from "../../either";
import { None, Some } from "..";
import { OptionFrom } from ".";

test(`OptionFrom.eitherRight()`, (t) => {
  t.true(
    OptionFrom.eitherRight(Right<number, string>("value")).eq(Some("value"))
  );
  t.true(OptionFrom.eitherRight(Left<number, string>(3)).eq(None()));
});

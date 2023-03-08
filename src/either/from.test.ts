import test from "ava";
import { None, Some } from "../option";
import { useSpy } from "../testutils/spy";
import { EitherFrom, Left, Right } from "./index";

test(`EitherFrom.optionLeft()`, (t) => {
  t.true(
    EitherFrom.optionLeft(Some(3), () => "value").eq(Left<number, string>(3))
  );
  t.true(
    EitherFrom.optionLeft(None(), () => "value").eq(
      Right<number, string>("value")
    )
  );
});
test(`EitherFrom.optionRight()`, (t) => {
  t.true(
    EitherFrom.optionRight(Some(3), () => "value").eq(Right<string, number>(3))
  );
  t.true(
    EitherFrom.optionRight(None(), () => "value").eq(
      Left<string, number>("value")
    )
  );
});

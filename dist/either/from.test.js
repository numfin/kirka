import test from "ava";
import { None, Some } from "../option";
import { EitherFrom, Left, Right } from "./index";
test(`EitherFrom.optionLeft()`, (t) => {
    t.true(EitherFrom.optionLeft(Some(3), () => "value").eq(Left(3)));
    t.true(EitherFrom.optionLeft(None(), () => "value").eq(Right("value")));
});
test(`EitherFrom.optionRight()`, (t) => {
    t.true(EitherFrom.optionRight(Some(3), () => "value").eq(Right(3)));
    t.true(EitherFrom.optionRight(None(), () => "value").eq(Left("value")));
});

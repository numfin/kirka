import test from "ava";
import { None, Some } from "../option";
import { useSpy } from "../testutils/spy";
import { Left, Right } from "./index";
test(`x.eq(y) when x == y`, (t) => {
    t.true(Left(3).eq(Left(3)));
    t.false(Left(3).eq(Right(3)));
    t.true(Right(4).eq(Right(4)));
    t.false(Right(4).eq(Left(4)));
});
test(`x.eq(y) when x != y`, (t) => {
    t.false(Left(3).eq(Left(4)));
    t.false(Left(3).eq(Right(4)));
    t.false(Right(4).eq(Right(3)));
    t.false(Right(4).eq(Left(3)));
});
test(`.isLeft()`, (t) => {
    t.true(Left(3).isLeft());
    t.false(Right(3).isLeft());
});
test(`.isRight()`, (t) => {
    t.true(Right(3).isRight());
    t.false(Left(3).isRight());
});
test(`.unwrap()`, (t) => {
    t.is(Left(3).unwrap(), 3);
    t.is(Right(4).unwrap(), 4);
});
test(`.unwrapLeft()`, (t) => {
    t.is(Left(3).unwrapLeft(), 3);
    t.throws(Right(3).unwrapLeft);
});
test(`.unwrapRight()`, (t) => {
    t.is(Right(3).unwrapRight(), 3);
    t.throws(Left(3).unwrapRight);
});
test(`.unwrapLeftOr()`, (t) => {
    t.is(Left(3).unwrapLeftOr(5), 3);
    t.is(Right(3).unwrapLeftOr(5), 5);
});
test(`.unwrapRightOr()`, (t) => {
    t.is(Right(3).unwrapRightOr(5), 3);
    t.is(Left(3).unwrapRightOr(5), 5);
});
test(`.isLeftAnd()`, (t) => {
    t.true(Left(3).isLeftAnd((v) => true));
    t.false(Left(3).isLeftAnd((v) => false));
    t.false(Right(3).isLeftAnd((v) => true));
    t.false(Right(3).isLeftAnd((v) => false));
});
test(`.isRightAnd()`, (t) => {
    t.true(Right(3).isRightAnd((v) => true));
    t.false(Right(3).isRightAnd((v) => false));
    t.false(Left(3).isRightAnd((v) => true));
    t.false(Left(3).isRightAnd((v) => false));
});
test(`.mapLeft()`, (t) => {
    t.true(Left(3)
        .mapLeft((v) => v * 2)
        .eq(Left(6)));
    t.true(Right(3)
        .mapLeft((v) => v * 2)
        .eq(Right(3)));
});
test(`.mapRight()`, (t) => {
    t.true(Right(3)
        .mapRight((v) => v * 2)
        .eq(Right(6)));
    t.true(Left(3)
        .mapRight((v) => v * 2)
        .eq(Left(3)));
});
test(`.inspectLeft()`, (t) => {
    const spyA = useSpy((v) => { });
    Left(3).inspectLeft(spyA.spy);
    t.is(spyA.calledTimes(), 1);
    t.deepEqual(spyA.calledWith()[0], [3]);
    const spyB = useSpy((v) => { });
    Right(4).inspectLeft(spyB.spy);
    t.is(spyB.calledTimes(), 0);
});
test(`.inspectRight()`, (t) => {
    const spyA = useSpy((v) => { });
    Right(3).inspectRight(spyA.spy);
    t.is(spyA.calledTimes(), 1);
    t.deepEqual(spyA.calledWith()[0], [3]);
    const spyB = useSpy((v) => { });
    Left(4).inspectRight(spyB.spy);
    t.is(spyB.calledTimes(), 0);
});
test(`.andThenLeft()`, (t) => {
    const eitherL = Left(3);
    t.true(eitherL.andThenLeft((v) => Left(v * 2)).eq(Left(6)));
    t.true(eitherL.andThenLeft((v) => Left("changed")).eq(Left("changed")));
    t.true(eitherL.andThenLeft((v) => Right(3)).eq(Right(3)));
    const eitherR = Right(4);
    t.true(eitherR.andThenLeft((v) => Left(v * 2)).eq(Right(4)));
    t.true(eitherR.andThenLeft((v) => Left("changed")).eq(Right(4)));
    t.true(eitherR.andThenLeft((v) => Right(v * 2)).eq(Right(4)));
});
test(`.andThenRight()`, (t) => {
    const eitherR = Right(3);
    t.true(eitherR.andThenRight((v) => Right(v * 2)).eq(Right(6)));
    t.true(eitherR.andThenRight((v) => Right("changed")).eq(Right("changed")));
    t.true(eitherR.andThenRight((v) => Left(v * 2)).eq(Left(6)));
    const eitherL = Left(4);
    t.true(eitherL.andThenRight((v) => Right(v * 2)).eq(Left(4)));
    t.true(eitherL.andThenRight((v) => Right("changed")).eq(Left(4)));
    t.true(eitherL.andThenRight((v) => Left(v * 2)).eq(Left(4)));
});
test(`.andLeft()`, (t) => {
    const eitherL = Left(3);
    t.true(eitherL.andLeft(Left(6)).eq(Left(6)));
    t.true(eitherL.andLeft(Left("changed")).eq(Left("changed")));
    t.true(eitherL.andLeft(Right(6)).eq(Right(6)));
    const eitherR = Right(4);
    t.true(eitherR.andLeft(Left(8)).eq(Right(4)));
    t.true(eitherR.andLeft(Left("changed")).eq(Right(4)));
    t.true(eitherR.andLeft(Right(8)).eq(Right(4)));
});
test(`.andRight()`, (t) => {
    const eitherR = Right(3);
    t.true(eitherR.andRight(Right(6)).eq(Right(6)));
    t.true(eitherR.andRight(Right("changed")).eq(Right("changed")));
    t.true(eitherR.andRight(Left(6)).eq(Left(6)));
    const eitherL = Left(4);
    t.true(eitherL.andRight(Right(8)).eq(Left(4)));
    t.true(eitherL.andRight(Right("changed")).eq(Left(4)));
    t.true(eitherL.andRight(Left(8)).eq(Left(4)));
});
test(`.toLeftOption()`, (t) => {
    t.true(Left(3).toLeftOption().eq(Some(3)));
    t.true(Right(3).toLeftOption().eq(None()));
});
test(`.toRightOption()`, (t) => {
    t.true(Right(3).toRightOption().eq(Some(3)));
    t.true(Left(3).toRightOption().eq(None()));
});

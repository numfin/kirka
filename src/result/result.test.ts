import test from "ava";
import { None, Some } from "../option";
import { useSpy } from "../testutils/spy";
import { Err, Ok, tryFn } from "./index";

test(`x.eq(y) when x == y`, (t) => {
  t.true(Err(3).eq(Err(3)));
  t.false(Err(3).eq(Ok(3)));

  t.true(Ok(4).eq(Ok(4)));
  t.false(Ok(4).eq(Err(4)));
});
test(`x.eq(y) when x != y`, (t) => {
  t.false(Err(3).eq(Err(4)));
  t.false(Err(3).eq(Ok(4)));

  t.false(Ok(4).eq(Ok(3)));
  t.false(Ok(4).eq(Err(3)));
});
test(`.format()`, (t) => {
  t.is(Err(3).format(), `Result.Err(3)`);
  t.is(Ok(3).format(), `Result.Ok(3)`);
  t.is(
    Err(3).format((t) => `${t.unwrapErr() * 2}`),
    `Result.Err(6)`
  );
  t.is(
    Ok(3).format((t) => `${t.unwrap() * 2}`),
    `Result.Ok(6)`
  );
});
test(`.isOk()`, (t) => {
  t.false(Err(3).isOk());
  t.true(Ok(3).isOk());
});
test(`.isErr()`, (t) => {
  t.false(Ok(3).isErr());
  t.true(Err(3).isErr());
});
test(`.unwrap()`, (t) => {
  t.is(Ok(3).unwrap(), 3);
  t.throws(Err(3).unwrap);
});
test(`.unwrapErr()`, (t) => {
  t.is(Err(3).unwrapErr(), 3);
  t.throws(Ok(3).unwrapErr);
});
test(`.unwrapOr()`, (t) => {
  t.is(Err(3).unwrapOr(5), 5);
  t.is(Ok(3).unwrapOr(5), 3);
});
test(`.unwrapErrOr()`, (t) => {
  t.is(Ok(3).unwrapErrOr(5), 5);
  t.is(Err(3).unwrapErrOr(5), 3);
});
test(`.isOkAnd()`, (t) => {
  t.false(Err(3).isOkAnd((v) => true));
  t.false(Err(3).isOkAnd((v) => false));
  t.true(Ok(3).isOkAnd((v) => true));
  t.false(Ok(3).isOkAnd((v) => false));
});
test(`.isErrAnd()`, (t) => {
  t.false(Ok(3).isErrAnd((v) => true));
  t.false(Ok(3).isErrAnd((v) => false));
  t.true(Err(3).isErrAnd((v) => true));
  t.false(Err(3).isErrAnd((v) => false));
});
test(`.map()`, (t) => {
  t.true(
    Err<number, number>(3)
      .map((v) => v * 2)
      .eq(Err(3))
  );
  t.true(
    Ok<number, number>(3)
      .map((v) => "value")
      .eq(Ok("value"))
  );
});
test(`.mapErr()`, (t) => {
  t.true(
    Ok<number, number>(3)
      .mapErr((v) => v * 2)
      .eq(Ok(3))
  );
  t.true(
    Err<number, number>(3)
      .mapErr((v) => "err")
      .eq(Err("err"))
  );
});
test(`.inspect()`, (t) => {
  const spyA = useSpy((v) => {});
  Err(3).inspect(spyA.spy);
  t.is(spyA.calledTimes(), 0);

  const spyB = useSpy((v) => {});
  Ok(4).inspect(spyB.spy);
  t.is(spyB.calledTimes(), 1);
  t.deepEqual(spyB.calledWith(0), [4]);
});
test(`.inspectErr()`, (t) => {
  const spyA = useSpy((v) => {});
  Ok(3).inspectErr(spyA.spy);
  t.is(spyA.calledTimes(), 0);

  const spyB = useSpy((v) => {});
  Err(4).inspectErr(spyB.spy);
  t.is(spyB.calledTimes(), 1);
  t.deepEqual(spyB.calledWith(0), [4]);
});
test(`.andThen()`, (t) => {
  const resultErr = Err<number, number>(3);
  // notice we change type of Ok() from number to string
  t.true(resultErr.andThen((v) => Err<string, number>(v * 2)).eq(Err(3)));
  t.true(resultErr.andThen((v) => Ok("value")).eq(Err(3)));

  const resultOk = Ok<number, number>(4);
  t.true(resultOk.andThen((v) => Err<string, number>(v * 2)).eq(Err(8)));
  t.true(resultOk.andThen((v) => Ok("value")).eq(Ok("value")));
});
test(`.orElse()`, (t) => {
  const resultOk = Ok<number, number>(3);
  // notice we change type of Err() from number to string
  t.true(resultOk.orElse((v) => Ok<number, string>(v * 2)).eq(Ok(3)));
  t.true(resultOk.orElse((v) => Err(v * 2)).eq(Ok(3)));

  const resultErr = Err<number, number>(4);
  t.true(resultErr.orElse((v) => Ok<number, string>(v * 2)).eq(Ok(8)));
  t.true(resultErr.orElse((v) => Err(v * 2)).eq(Err(8)));
});
test(`.and()`, (t) => {
  const resultErr = Err<number, number>(3);
  t.true(resultErr.and(Err<string, number>(6)).eq(Err(3)));
  t.true(resultErr.and(Ok(6)).eq(Err(3)));

  const resultOk = Ok<number, number>(4);
  t.true(resultOk.and(Err<string, number>(8)).eq(Err(8)));
  t.true(resultOk.and(Ok(8)).eq(Ok(8)));
});
test(`.or()`, (t) => {
  const resultOk = Ok<number, number>(3);
  t.true(resultOk.or(Ok<number, string>(6)).eq(Ok(3)));
  t.true(resultOk.or(Err(6)).eq(Ok(3)));

  const resultErr = Err<number, number>(4);
  t.true(resultErr.or(Ok<number, string>(8)).eq(Ok(8)));
  t.true(resultErr.or(Err(8)).eq(Err(8)));
});
test(`.ok()`, (t) => {
  t.true(Err(3).ok().eq(None()));
  t.true(Ok(3).ok().eq(Some(3)));
});
test(`.err()`, (t) => {
  t.true(Ok(3).err().eq(None()));
  t.true(Err(3).err().eq(Some(3)));
});
test(`.tryFn()`, (t) => {
  t.true(
    tryFn(() => {
      throw new Error("Oh no");
    }).isErr()
  );
  t.true(
    tryFn(() => {
      return "good";
    }).eq(Ok("good"))
  );
});

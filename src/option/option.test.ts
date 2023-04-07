import test from "ava";
import { Ok, Err } from "../result/index.js";
import { None, Some } from "../index.js";

test(`.clone()`, (t) => {
  const option = Some(3);
  const clonedOption = option.clone();
  t.not(option.inner(), clonedOption.inner());
  t.deepEqual(option.inner(), clonedOption.inner());
});
test(`.eq()`, (t) => {
  t.true(Some(3).eq(Some(3)));
  t.true(None().eq(None()));
  t.false(Some(3).eq(None()));
  t.false(None().eq(Some(3)));
});
test(`.format()`, (t) => {
  t.is(Some(3).format(), `Some(3)`);
  t.is(None().format(), `None`);
  t.is(
    Some(3).format((v) => `${v.unwrap() * 2}`),
    `Some(6)`
  );
  t.is(
    None().format((t) => `wow`),
    `None`
  );
});
test(`.eq(by)`, (t) => {
  t.true(Some({ x: 3 }).eq(Some({ x: 3 }), (v) => v.x));
  t.true(None<{ x: number }>().eq(None(), (v) => v.x));
  t.false(Some({ x: 3 }).eq(None(), (v) => v.x));
  t.false(None<{ x: number }>().eq(Some({ x: 3 }), (v) => v.x));
});
test(`.unwrap()`, (t) => {
  t.is(Some(3).unwrap(), 3);
  t.throws(None().unwrap);
});
test(`.unwrapOr()`, (t) => {
  t.is(Some(3).unwrapOr(4), 3);
  t.is(None().unwrapOr(4), 4);
});
test(`.isNone()`, (t) => {
  t.false(Some(3).isNone());
  t.true(None().isNone());
});
test(`.isSome()`, (t) => {
  t.true(Some(3).isSome());
  t.false(None().isSome());
});
test(`Some.take()`, (t) => {
  const option = Some(5);
  const takenOption = option.take();
  t.true(takenOption.eq(Some(5)));
  t.true(option.isNone());
  t.not(option.inner(), takenOption.inner());
});
test(`None.take()`, (t) => {
  const option = None();
  const takenOption = option.take();
  t.true(takenOption.isNone());
  t.true(option.isNone());
  t.not(option.inner(), takenOption.inner());
});
test(`Some.isSomeAnd()`, (t) => {
  const option = Some(5);

  t.true(option.isSomeAnd((v) => v === 5));
  t.false(option.isSomeAnd((v) => v !== 5));
});
test(`None.isSomeAnd()`, (t) => {
  const option = None<number>();

  t.false(option.isSomeAnd((v) => true));
  t.false(option.isSomeAnd((v) => false));
});
test(`Some.isNoneAnd()`, (t) => {
  const option = Some(5);

  t.false(option.isNoneAnd(() => true));
  t.false(option.isNoneAnd(() => false));
});
test(`None.isNoneAnd()`, (t) => {
  const option = None<number>();

  t.true(option.isNoneAnd(() => true));
  t.false(option.isNoneAnd(() => false));
});
test(`Some.map()`, (t) => {
  const optionSome = Some(5).map((v) => v * 2);
  t.true(optionSome.eq(Some(10)));
  const mappedTwice = optionSome.map((v) => v * 2);
  t.true(mappedTwice.eq(Some(20)));
});
test(`None.map()`, (t) => {
  const optionSome = None<number>().map((v) => v * 2);
  t.true(optionSome.isNone());
  const mappedTwice = optionSome.map((v) => v * 2);
  t.true(mappedTwice.isNone());
});
test(`Some.or()`, (t) => {
  const option = Some(1);
  t.true(option.or(Some(6)).eq(Some(1)));
  t.true(option.or(Some(6)).or(Some(10)).eq(Some(1)));
  t.true(option.or(None()).eq(Some(1)));
});
test(`None.or()`, (t) => {
  const option = None<number>();
  t.true(option.or(Some(6)).eq(Some(6)));
  t.true(option.or(Some(6)).or(Some(10)).eq(Some(6)));
  t.true(option.or(None()).eq(None()));
});
test(`Some.orElse()`, (t) => {
  const option = Some(1);
  t.true(option.orElse(() => Some(6)).eq(Some(1)));
  t.true(
    option
      .orElse(() => Some(6))
      .orElse(() => Some(10))
      .eq(Some(1))
  );
  t.true(option.orElse(() => None()).eq(Some(1)));
});
test(`None.orElse()`, (t) => {
  const option = None<number>();
  t.true(option.orElse(() => Some(6)).eq(Some(6)));
  t.true(
    option
      .orElse(() => Some(6))
      .or(Some(10))
      .eq(Some(6))
  );
  t.true(option.orElse(() => None()).eq(None()));
});
test(`Some.and()`, (t) => {
  const option = Some(4);
  t.true(option.and(Some(5)).eq(Some(5)));
  t.true(option.and(Some(5)).and(Some(10)).eq(Some(10)));
  t.true(option.and(None()).eq(None()));
  t.true(option.and(None()).and(Some(5)).eq(None()));
});
test(`None.and()`, (t) => {
  const option = None<number>();
  t.true(option.and(Some(5)).eq(None()));
  t.true(option.and(Some(5)).and(Some(10)).eq(None()));
});
test(`Some.andThen()`, (t) => {
  const option = Some(4);
  t.true(option.andThen((v) => Some(5)).eq(Some(5)));
  t.true(
    option
      .andThen((v) => Some(5))
      .and(Some(10))
      .eq(Some(10))
  );
  t.true(option.andThen((v) => None()).eq(None()));
  t.true(
    option
      .andThen((v) => None())
      .and(Some(5))
      .eq(None())
  );
});
test(`None.andThen()`, (t) => {
  const option = None<number>();
  t.true(option.andThen(() => Some(5)).eq(None()));
  t.true(
    option
      .andThen(() => Some(5))
      .and(Some(10))
      .eq(None())
  );
});
test(`.result()`, (t) => {
  t.true(
    Some("value")
      .result(() => 4)
      .eq(Ok("value"))
  );
  t.true(
    None<string>()
      .result(() => 4)
      .eq(Err(4))
  );
});

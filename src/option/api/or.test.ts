import test from "ava";
import { NewOption } from "../../index.js";
import { or } from "./or.js";

test(`Some.or()`, (t) => {
  const option = NewOption.Some(1);
  t.is(option.do(or(NewOption.Some(6))).unwrap(), 1);
  t.is(
    option
      .do(or(NewOption.Some(6)))
      .do(or(NewOption.Some(10)))
      .unwrap(),
    1
  );
  t.is(option.do(or(NewOption.None())).unwrap(), 1);
});
test(`None.or()`, (t) => {
  const option = NewOption.None<number>();
  const orsix = or(NewOption.Some(6));
  const orten = or(NewOption.Some(10));
  t.is(option.do(orsix).unwrap(), 6);
  t.is(option.do(orsix).do(orten).unwrap(), 6);
  t.true(option.do(or(NewOption.None())).isNone());
});

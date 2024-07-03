import test from "ava";
import { NewOption } from "../../index.js";
import { take } from "./take.js";

test(`Some.take()`, (t) => {
  const option = NewOption.Some(5);
  const takenOption = option.do(take());

  t.is(takenOption.unwrap(), 5);
  t.true(option.isNone());
  t.not(option, takenOption);
});
test(`None.take()`, (t) => {
  const option = NewOption.None();
  const takenOption = option.do(take());
  t.true(takenOption.isNone());
  t.true(option.isNone());
  t.not(option, takenOption);
});

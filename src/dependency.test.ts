import test from "ava";
import { EitherFrom, Left } from "./result";
import { OptionFrom, Some } from "./option";

test(`Circular dependencies resolving`, (t) => {
  // Apis
  t.true(
    Some(3)
      .toLeft(() => 4)
      .eq(Left(3))
  );
  t.true(Left(3).toLeftOption().eq(Some(3)));
  // Froms
  t.true(OptionFrom.eitherLeft(Left(3)).eq(Some(3)));
  t.true(EitherFrom.optionLeft(Some(3), () => 4).eq(Left(3)));
});

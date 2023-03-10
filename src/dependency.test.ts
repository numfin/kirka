import test from "ava";
import { Err, Ok } from "./result";
import { None, OptionFrom, Some } from "./option";
import { ResultFrom } from "./result/from";

test(`Circular dependencies resolving`, (t) => {
  // Apis
  t.true(
    Some(3)
      .result(() => 4)
      .eq(Ok(3))
  );
  t.true(Err(3).ok().eq(None()));
  // Froms
  t.true(OptionFrom.ok(Err(3)).eq(None()));
  t.true(ResultFrom.option(Some(3), () => 4).eq(Ok(3)));
});

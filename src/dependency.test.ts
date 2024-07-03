import test from "ava";
// import { Err, Ok } from "./result/index.js";
// import { ResultFrom } from "./result/from/index.js";
import { NewOption } from "./option/index.js";

test.skip(`Circular dependencies resolving`, (t) => {
  // Apis
  t.true(
    NewOption.Some(3)
    // .result(() => 4)
    // .eq(Ok(3))
  );
  // t.true(Err(3).ok().eq(None()));
  // Froms
  // t.true(OptionFrom.ok(Err(3)).eq(None()));
  // t.true(ResultFrom.option(Some(3), () => 4).eq(Ok(3)));
});

import test from "ava";
import { Err, Ok } from "./result/index.js";
import { NewOption, None, Some } from "./option/index.js";
import { OptionFrom, OptionTo, ResultFrom, ResultTo, } from "./convert/result-option.js";
test(`Circular dependencies resolving`, (t) => {
    // Apis
    t.true(NewOption.Some(3)
        .do(OptionTo.ok(() => 4))
        .eq(Ok(3)));
    t.true(Err(3).do(ResultTo.option()).eq(None()));
    // Froms
    t.true(OptionFrom.result(Err(3)).eq(None()));
    t.true(ResultFrom.ok(Some(3), () => 4).eq(Ok(3)));
});

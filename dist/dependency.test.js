import test from "ava";
import { EitherApi, EitherFrom, Left } from "./either";
import { OptionApi, OptionFrom, Some } from "./option";
test(`Circular dependencies resolving`, (t) => {
    // Apis
    t.true(OptionApi.toLeft(Some(3), () => 4).eq(Left(3)));
    t.true(EitherApi.toLeftOption(Left(3)).eq(Some(3)));
    // Froms
    t.true(OptionFrom.eitherLeft(Left(3)).eq(Some(3)));
    t.true(EitherFrom.optionLeft(Some(3), () => 4).eq(Left(3)));
});

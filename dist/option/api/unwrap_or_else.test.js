import test from "ava";
import { NewOption } from "../../index.js";
import { unwrapOrElse } from "./unwrap_or_else.js";
test(`Some(x).unwrapOrElse()`, (t) => {
    t.is(NewOption.Some("v").do(unwrapOrElse(() => "v2")), "v");
});
test(`None().unwrapOrElse()`, (t) => {
    t.is(NewOption.None().do(unwrapOrElse(() => "v2")), "v2");
});

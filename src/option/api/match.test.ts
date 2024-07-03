import test from "ava";
import { NewOption } from "../index.js";
import { match } from "./match.js";

test(`Some(x).match(onSome, onNone) returns onSome(x)`, (t) => {
  t.is(
    NewOption.Some("v").do(
      match(
        (v) => v,
        () => "_"
      )
    ),
    "v"
  );
});

test(`None.match(onSome, onNone) returns onNone()`, (t) => {
  t.is(
    NewOption.None().do(
      match(
        (v) => v,
        () => "_"
      )
    ),
    "_"
  );
});

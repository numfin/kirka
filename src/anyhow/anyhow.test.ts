import test from "ava";
import { AnyHow } from "./index.js";

test("Sink error", (t) => {
  const anyhowErr = AnyHow.msg("Hi");
  const wrappedErr = anyhowErr.wrapWith(() => "Context");
  t.is(wrappedErr.toString(), ["Hi", "Context"].join("\n"));
});
test("Separated context", (t) => {
  const anyhowErr = AnyHow.msg("Hi");
  const wrappedErr = anyhowErr.wrapWith(() => "Context");

  const a = wrappedErr.wrapWith(() => "a");
  const b = wrappedErr.wrapWith(() => "b");

  t.is(wrappedErr.toString(), ["Hi", "Context"].join("\n"));
  t.is(a.toString(), ["Hi", "Context", "a"].join("\n"));
  t.is(b.toString(), ["Hi", "Context", "b"].join("\n"));
});

import test from "ava";
import { AnyHow } from "./index.js";

test("Sink error", (t) => {
  const anyhowErr = AnyHow.msg("Hi");
  anyhowErr.wrapWith(() => "Context");

  t.is(anyhowErr.toString(), ["Hi", "Context"].join("\n"));
});

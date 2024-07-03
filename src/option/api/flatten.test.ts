import test from "ava";
import { NewOption } from "../../index.js";
import { flatten } from "./flatten.js";
import { eq } from "./eq.js";

test(`flatten() should flatten inner Option`, (t) => {
  const s = NewOption.Some(3);
  const ss = NewOption.Some(s);
  const sss = NewOption.Some(ss);
  const n = NewOption.None();
  const nn = NewOption.None<NewOption<number>>();
  const sn = NewOption.Some(n);

  t.true(ss.do(flatten()).do(eq(s)));
  t.true(sss.do(flatten()).do(flatten()).do(eq(s)));
  t.true(nn.do(flatten()).do(eq(NewOption.None())));
  t.true(sn.do(flatten()).do(eq(NewOption.None())));

  // @ts-expect-error
  s.do(flatten());
  // @ts-expect-error
  n.do(flatten());
});

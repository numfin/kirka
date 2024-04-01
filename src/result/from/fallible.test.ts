import test from "ava";
import { fallible, fallibleAsync } from "./fallible.js";

test(`ResultFrom.fallible()  Throw`, (t) => {
    const err = new Error("testing");
    const result = fallible(() => { throw err });
    const inner = result.inner();
    t.true(result.isErr())
    t.is(inner.value, err)
    t.not(inner.value, new Error("another error"))
});
test(`ResultFrom.fallible()  Ok`, (t) => {
    const result = fallible(() => 3);
    t.is(result.unwrap(), 3)
});
test(`ResultFrom.fallibleAsync() Throw`, async (t) => {
    const err = new Error("testing");
    const result = await fallibleAsync(() => { throw err });
    const inner = result.inner();

    t.true(result.isErr())
    t.is(inner.value, err)
    t.not(inner.value, new Error("another error"))
});
test(`ResultFrom.fallibleAsync()  Ok`, async (t) => {
    const result = await fallibleAsync(async () => 3);
    t.is(result.unwrap(), 3)
});
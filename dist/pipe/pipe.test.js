import test from "ava";
import { Pipe } from "./index.js";
test("Can chain functions", (t) => {
    const pipe = Pipe((v) => v + "asd").chain((v) => v + "qwe");
    t.is(pipe.call("hi"), "hiasdqwe");
});
test(".chain() mutates original pipe", (t) => {
    const pipe = Pipe((v) => v + "asd").chain((v) => v + "qwe");
    pipe.chain((v) => v + "zxc");
    t.is(pipe.call("hi"), "hiasdqwezxc");
});
test(".clone()", (t) => {
    const pipe = Pipe((v) => v + "asd").chain((v) => v + "qwe");
    const pipe2 = pipe.clone().chain((v) => v + "zxc");
    t.is(pipe.call("hi"), "hiasdqwe");
    t.is(pipe2.call("hi"), "hiasdqwezxc");
});

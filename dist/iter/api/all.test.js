import test from "ava";
import { Iter } from "../index.js";
import { all } from "./all.js";
test(`all() truthy if everything valid`, (t) => {
    const numbers = Iter.from([1, 2, 3, 4]);
    t.true(numbers.do(all((v) => typeof v === "number")));
});
test(`all() falsy if at least one is invalid`, (t) => {
    const firstInvalid = Iter.from(["1", 2, 3, 4]);
    const middleInvalid = Iter.from([1, "2", 3, 4]);
    const lastInvalid = Iter.from([1, 2, 3, "4"]);
    const isNumber = all((v) => typeof v === "number");
    t.false(firstInvalid.do(isNumber));
    t.false(middleInvalid.do(isNumber));
    t.false(lastInvalid.do(isNumber));
});
test(`all() truthy on empty sets`, (t) => {
    const notAllNumbers = Iter.from([]);
    t.true(notAllNumbers.do(all((_) => false)));
});

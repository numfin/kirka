import test from "ava";
import { NewOption, Ok, Schema } from "../../index.js";
test("Can check if value is string", (t) => {
    let s = Schema.str();
    t.true(s.check(""));
    t.true(s.check("asd"));
    t.false(s.check(3));
    t.false(s.check(null));
    t.false(s.check(undefined));
    t.false(s.check({ toString: () => "" }));
});
test("Can extract value", (t) => {
    let s = Schema.str();
    t.true(s.parse("").eq(Ok("")));
    t.true(s.parse("asd").eq(Ok("asd")));
    t.true(s.parse(3).isErr());
});
test("Can extract optional value", (t) => {
    let s = Schema.str().optional();
    t.is(s.parse("").unwrap().unwrap(), "");
    t.true(s.parse("asd").unwrap().eq(NewOption.Some("asd")));
    t.true(s.parse(null).unwrap().eq(NewOption.None()));
    t.true(s.parse(undefined).unwrap().eq(NewOption.None()));
});
test("Can validate value", (t) => {
    let s = Schema.str().is((v) => v.length > 1);
    t.true(s.parse("").isErr());
    t.true(s.parse("asd").eq(Ok("asd")));
    let so = s.optional();
    t.true(so.parse("").isErr());
    t.true(so.parse("asd").unwrap().eq(NewOption.Some("asd")));
});
test("Can transform value", (t) => {
    let s = Schema.str();
    let s1 = s.transform((v) => Ok(v + "qwe"));
    t.is(s1.parse("asd").unwrap(), "asdqwe");
    let s2 = s.optional().transform((v) => Ok(v + "dsa"));
    t.true(s2.parse("xyz").unwrap().eq(NewOption.Some("xyzdsa")));
});
test("Set min length", (t) => {
    let s = Schema.str().min(4);
    t.true(s.parse("asd").isErr());
    t.is(s.parse("asdf").unwrap(), "asdf");
    let so = s.optional();
    t.true(so.parse("asd").isErr());
    t.true(so.parse("asdf").unwrap().eq(NewOption.Some("asdf")));
    t.true(so.parse(null).unwrap().eq(NewOption.None()));
});
test("Set max length", (t) => {
    let s = Schema.str().max(3);
    t.is(s.parse("asd").unwrap(), "asd");
    t.true(s.parse("asdf").isErr());
    let so = s.optional();
    t.true(so.parse("asd").unwrap().eq(NewOption.Some("asd")));
    t.true(so.parse("asdf").isErr());
    t.true(so.parse(null).unwrap().eq(NewOption.None()));
});
test("Is numeric", (t) => {
    let s = Schema.str().numeric();
    t.true(s.parse("asd").isErr());
    t.is(s.parse("").unwrap(), "");
    t.is(s.parse("0").unwrap(), "0");
    t.is(s.parse("0123456789").unwrap(), "0123456789");
});
test("Is alphabetic", (t) => {
    let s = Schema.str().alphabetic();
    t.true(s.parse("asd2").isErr());
    t.is(s.parse("asdQWE").unwrap(), "asdQWE");
    t.is(s.parse("").unwrap(), "");
});
test("Is alphanumeric", (t) => {
    let s = Schema.str().alphanumeric();
    t.is(s.parse("").unwrap(), "");
    t.is(s.parse("0").unwrap(), "0");
    t.is(s.parse("0123456789").unwrap(), "0123456789");
    t.is(s.parse("asd2").unwrap(), "asd2");
    t.is(s.parse("asdQWE").unwrap(), "asdQWE");
    t.is(s.parse("ёЁйЙъЪЫasdQWE").unwrap(), "ёЁйЙъЪЫasdQWE");
});
test("Custom regex", (t) => {
    let s = Schema.str().re(() => /asd/g);
    t.is(s.parse("asd").unwrap(), "asd");
    t.is(s.parse("123asd]").unwrap(), "123asd]");
    t.true(s.parse("").isErr());
});

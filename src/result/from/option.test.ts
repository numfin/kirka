import test from "ava";
import { None, Some } from "../../option/index.js";
import { Err, Ok } from "../index.js";
import { option } from "./option.js";

test(`Result.option()`, (t) => {
  t.true(option(Some(3), () => "value").eq(Ok(3)));
  t.true(option(None(), () => "value").eq(Err("value")));
});

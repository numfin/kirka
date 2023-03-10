import test from "ava";
import { None, Some } from "../../option";
import { Err, Ok } from "../index";
import { option } from "./option";

test(`Result.option()`, (t) => {
  t.true(option(Some(3), () => "value").eq(Ok(3)));
  t.true(option(None(), () => "value").eq(Err("value")));
});

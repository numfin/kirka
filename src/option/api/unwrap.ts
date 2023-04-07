import { Option } from "../interfaces.js";
import { format } from "./format.js";

export function unwrap<T>(option: Option<T>) {
  const inner = option.inner();
  if (inner.type === "None") {
    throw new Error(`unwrap called on ${format(option)}`);
  }
  return inner.value;
}

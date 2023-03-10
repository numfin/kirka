import { OptionUnion } from "../interfaces";
import { format } from "./format";

export function unwrap<T>(option: OptionUnion<T>) {
  if (option.type === "None") {
    throw new Error(`unwrap called on ${format(option)}`);
  }
  return option.value;
}

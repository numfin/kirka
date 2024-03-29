import { Option } from "../interfaces.js";

export function format<T>(
  option: Option<T>,
  fn?: (option: Option<T>) => string
) {
  const inner = option.inner();
  return inner.type === "Some"
    ? `Some(${fn?.(option) ?? inner.value})`
    : `None`;
}

import { Option } from "../index.js";

export type FlattenedOption<T> = T extends Option<unknown> ? T : Option<T>;

export function flatten<T>(source: Option<T>): FlattenedOption<T> {
  if (source.isNone()) {
    return source as FlattenedOption<T>;
  }
  const v = source.unwrap();
  try {
    if ((v as FlattenedOption<T>).isSome()) {
      return v as FlattenedOption<T>;
    }
    return v as FlattenedOption<T>;
  } catch (_) {
    return source as FlattenedOption<T>;
  }
}

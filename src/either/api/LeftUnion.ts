import { Left } from "../interfaces";

export function LeftUnion<L>(value: L): Left<L> {
  return { value, type: "Left" };
}

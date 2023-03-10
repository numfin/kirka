import { Right } from "../interfaces";

export function RightUnion<R>(value: R): Right<R> {
  return { value, type: "Right" };
}

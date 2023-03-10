import { Iter } from "../interfaces";
import { OptionFrom } from "../../option";

export function nth<T>(source: Iter<T>, index: number) {
  return OptionFrom.nullable(source.skip(index).take(1).collect()[0]);
}

import { iterEnumerate } from "../generators/iterEnumerate";
import { ClonnableGenerator } from "../interfaces";

export function enumerate<T>(source: ClonnableGenerator<T>) {
  return iterEnumerate(source());
}

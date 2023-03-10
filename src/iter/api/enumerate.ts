import { ClonnableGenerator } from "../interfaces";
import { iterEnumerate } from "../gen";

export function enumerate<T>(source: ClonnableGenerator<T>) {
  return iterEnumerate(source());
}

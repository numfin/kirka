import { ClonnableGenerator } from "../interfaces";

export function collect<T>(source: ClonnableGenerator<T>) {
  return Array.from(source());
}

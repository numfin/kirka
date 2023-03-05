import { M } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";

export class MapOperation<A, B> extends IntermidiateOperation<A, B> {
  constructor(fn: (v: A, terminate: () => void) => B);
  constructor(fn: (v: A, terminate: () => void) => Iterable<B>, isFlat: true);
  constructor(
    private readonly fn: (v: A, terminate: () => void) => B,
    isFlat = false
  ) {
    super(isFlat);
  }

  execute(value: A): M.Maybe<B> {
    return M.just(this.fn(value, () => this.terminate()));
  }
}

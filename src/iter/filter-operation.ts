import { M } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";

export class FilterOperation<A, B extends A = A> extends IntermidiateOperation<
  A,
  B
> {
  constructor(
    private readonly predicate: (v: A, terminate: () => void) => v is B
  ) {
    super();
  }

  execute(value: A): M.Maybe<B> {
    const result = this.predicate(value, () => this.terminate());
    if (this.terminated) {
      return M.none<B>();
    }
    return result ? M.just<B>(value as B) : M.none<B>();
  }
}

import { M } from "../maybe";

export abstract class IntermidiateOperation<A, B> {
  protected terminated = false;

  constructor(public readonly isFlat = false) {}

  public get isTerminated(): boolean {
    return this.terminated;
  }

  abstract execute(v: A): M.Maybe<B>;

  protected terminate() {
    this.terminated = true;
  }
}

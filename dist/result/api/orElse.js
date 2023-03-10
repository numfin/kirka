import { unionOk } from "./unionOk";
export function orElse(result, fn) {
    if (result.isErr()) {
        return fn(result.unwrapErr()).inner();
    }
    return unionOk(result.unwrap());
}

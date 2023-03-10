import { LeftUnion } from "./LeftUnion";
export function andThenRight(either, fn) {
    if (either.isRight()) {
        return fn(either.unwrap()).inner();
    }
    return LeftUnion(either.unwrap());
}

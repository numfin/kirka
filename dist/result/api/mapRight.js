import { LeftUnion } from "./LeftUnion";
import { RightUnion } from "./RightUnion";
export function mapRight(either, fn) {
    if (either.isRight()) {
        return RightUnion(fn(either.unwrap()));
    }
    return LeftUnion(either.unwrap());
}

import { Left, Right } from "../../either";
export function toLeft(option, right_default) {
    return option.isSome() ? Left(option.unwrap()) : Right(right_default());
}

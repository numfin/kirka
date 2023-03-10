import { Left, Right } from "../../result";
export function toLeft(option, right_default) {
    return option.isSome() ? Left(option.unwrap()) : Right(right_default());
}

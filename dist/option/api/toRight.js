import { Left, Right } from "../../result";
export function toRight(option, left_default) {
    return option.isSome() ? Right(option.unwrap()) : Left(left_default());
}

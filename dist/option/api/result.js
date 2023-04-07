import { Err, Ok } from "../../result/index.js";
export function result(option, noneErr) {
    return option.isSome() ? Ok(option.unwrap()) : Err(noneErr());
}

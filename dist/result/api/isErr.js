import { tagErr } from "../base.js";
export function isErr(result) {
    return result.type === tagErr;
}

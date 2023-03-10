import { iterEnumerate } from "../gen";
export function enumerate(source) {
    return iterEnumerate(source());
}

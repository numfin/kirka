import { just } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";
export class MapOperation extends IntermidiateOperation {
    fn;
    constructor(fn, isFlat = false) {
        super(isFlat);
        this.fn = fn;
    }
    execute(value) {
        return just(this.fn(value, () => this.terminate()));
    }
}
//# sourceMappingURL=map-operation.js.map
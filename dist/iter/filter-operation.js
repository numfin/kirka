import { M } from "../maybe";
import { IntermidiateOperation } from "./intermediate-operation";
export class FilterOperation extends IntermidiateOperation {
    predicate;
    constructor(predicate) {
        super();
        this.predicate = predicate;
    }
    execute(value) {
        const result = this.predicate(value, () => this.terminate());
        if (this.terminated) {
            return M.none();
        }
        return result ? M.just(value) : M.none();
    }
}
//# sourceMappingURL=filter-operation.js.map
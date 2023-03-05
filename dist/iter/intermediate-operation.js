export class IntermidiateOperation {
    isFlat;
    terminated = false;
    constructor(isFlat = false) {
        this.isFlat = isFlat;
    }
    get isTerminated() {
        return this.terminated;
    }
    terminate() {
        this.terminated = true;
    }
}
//# sourceMappingURL=intermediate-operation.js.map
import { Err } from "../index.js";
export class AnyHow {
    err;
    ctx;
    constructor(err, ctx = []) {
        this.err = err;
        this.ctx = ctx;
    }
    static msg(msg) {
        return new AnyHow(msg);
    }
    static expect(expected, got) {
        return AnyHow.msg(`Expected ${expected}, got: ${got}`);
    }
    wrapWith(msgFn) {
        return new AnyHow(this.err, this.ctx.concat(msgFn()));
    }
    toString() {
        const report = [this.err.toString()].concat(this.ctx);
        return report.join("\n");
    }
    toErr() {
        return Err(this);
    }
}

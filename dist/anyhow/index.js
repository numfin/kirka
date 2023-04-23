import { Err } from "../index.js";
export class AnyHow {
    err;
    ctx;
    constructor(err, ctx = []) {
        this.err = err;
        this.ctx = ctx;
    }
    static msg(msg) {
        return new this(msg);
    }
    static expect(expected, got) {
        return this.msg(`Expected ${expected}, got: ${got}`);
    }
    wrapWith(msgFn) {
        this.ctx.push(msgFn());
        return this;
    }
    toString() {
        const report = Array.from(this.ctx);
        report.push(this.err.toString());
        return report.reverse().join("\n");
    }
    toErr() {
        return Err(this);
    }
}

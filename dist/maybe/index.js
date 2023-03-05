export var M;
(function (M) {
    let MaybeState;
    (function (MaybeState) {
        MaybeState["Just"] = "Just";
        MaybeState["None"] = "None";
    })(MaybeState || (MaybeState = {}));
    function isWrappedFunction(m) {
        return typeof m.value === "function";
    }
    function isWrappedAsyncFunction(m) {
        return typeof m.value === "function";
    }
    class MaybeConstructor {
        type;
        value;
        static chain(f) {
            return (m) => m.asyncChain(f);
        }
        static merge(maybies) {
            return maybies.reduce((res, v) => res.chain((res) => v.map((v) => res.concat([v]))), MaybeConstructor.just([]));
        }
        static from(v) {
            return MaybeConstructor.just(v);
        }
        static fromNullable(v) {
            return v !== null && v !== undefined
                ? MaybeConstructor.just(v)
                : MaybeConstructor.none();
        }
        static none() {
            return new MaybeConstructor("None" /* MaybeState.None */, undefined);
        }
        static just(v) {
            return new MaybeConstructor("Just" /* MaybeState.Just */, v);
        }
        constructor(type, value) {
            this.type = type;
            this.value = value;
        }
        isNone() {
            return this.type === "None" /* MaybeState.None */;
        }
        isJust() {
            return this.type === "Just" /* MaybeState.Just */;
        }
        join() {
            return this.chain((x) => x);
        }
        map(f) {
            if (this.isJust()) {
                return MaybeConstructor.just(f(this.value));
            }
            return MaybeConstructor.none();
        }
        asyncMap(f) {
            if (this.isJust()) {
                return f(this.value).then(MaybeConstructor.just);
            }
            return Promise.resolve(MaybeConstructor.none());
        }
        apply(argOrFn) {
            if (this.isNone() || argOrFn.isNone()) {
                return MaybeConstructor.none();
            }
            if (isWrappedFunction(this)) {
                return argOrFn.map(this.value);
            }
            if (isWrappedFunction(argOrFn)) {
                return argOrFn.apply(this);
            }
            throw new Error("Some of the arguments should be a function");
        }
        asyncApply(argOrFn) {
            if (this.isNone() || argOrFn.isNone()) {
                return Promise.resolve(MaybeConstructor.none());
            }
            if (isWrappedAsyncFunction(this)) {
                return argOrFn
                    .map((a) => Promise.resolve(a))
                    .asyncMap((pa) => pa.then(this.value));
            }
            if (isWrappedAsyncFunction(argOrFn)) {
                return argOrFn.asyncApply(this);
            }
            throw new Error("Some of the arguments should be a function");
        }
        chain(f) {
            if (this.isJust()) {
                return f(this.value);
            }
            return MaybeConstructor.none();
        }
        asyncChain(f) {
            if (this.isJust()) {
                return f(this.value);
            }
            return Promise.resolve(MaybeConstructor.none());
        }
        or(x) {
            return this.isNone() ? x : this;
        }
        unwrap() {
            if (this.isJust())
                return this.value;
            throw new Error("Value is None");
        }
    }
    M.MaybeConstructor = MaybeConstructor;
    M.merge = MaybeConstructor.merge, M.just = MaybeConstructor.just, M.none = MaybeConstructor.none, M.from = MaybeConstructor.from, M.fromNullable = MaybeConstructor.fromNullable, M.chain = MaybeConstructor.chain;
    M.isMaybe = (value) => value instanceof MaybeConstructor;
})(M || (M = {}));
//# sourceMappingURL=index.js.map
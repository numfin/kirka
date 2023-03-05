var EitherType;
(function (EitherType) {
    EitherType["Left"] = "Left";
    EitherType["Right"] = "Right";
})(EitherType || (EitherType = {}));
function isWrappedFunction(m) {
    return typeof m.value === "function";
}
class EitherConstructor {
    type;
    value;
    static chain(f) {
        return (m) => m.asyncChain(f);
    }
    static mergeInOne(eithers) {
        return eithers.reduce((res, v) => res.chain((res) => v.map((v) => res.concat([v]))), EitherConstructor.right([]));
    }
    static merge = EitherConstructor.mergeInOne;
    static from(v) {
        return EitherConstructor.right(v);
    }
    static right(v) {
        return new EitherConstructor("Right" /* EitherType.Right */, v);
    }
    static left(v) {
        return new EitherConstructor("Left" /* EitherType.Left */, v);
    }
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    isLeft() {
        return this.type === "Left" /* EitherType.Left */;
    }
    isRight() {
        return this.type === "Right" /* EitherType.Right */;
    }
    join() {
        return this.chain((x) => x);
    }
    mapRight(f) {
        return this.map(f);
    }
    mapLeft(f) {
        if (this.isLeft()) {
            return EitherConstructor.left(f(this.value));
        }
        return EitherConstructor.right(this.value);
    }
    map(f) {
        if (this.isLeft()) {
            return EitherConstructor.left(this.value);
        }
        return EitherConstructor.right(f(this.value));
    }
    asyncMap(f) {
        if (this.isLeft()) {
            return Promise.resolve(EitherConstructor.left(this.value));
        }
        return f(this.value).then((v) => EitherConstructor.right(v));
    }
    apply(argOrFn) {
        if (this.isLeft()) {
            return EitherConstructor.left(this.value);
        }
        if (argOrFn.isLeft()) {
            return EitherConstructor.left(argOrFn.value);
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
        if (this.isLeft()) {
            return Promise.resolve(EitherConstructor.left(this.value));
        }
        if (argOrFn.isLeft()) {
            return Promise.resolve(EitherConstructor.left(argOrFn.value));
        }
        if (isWrappedFunction(this)) {
            return argOrFn
                .map((a) => Promise.resolve(a))
                .asyncMap((pa) => pa.then(this.value));
        }
        if (isWrappedFunction(argOrFn)) {
            return argOrFn.asyncApply(this);
        }
        throw new Error("Some of the arguments should be a function");
    }
    chain(f) {
        if (this.isLeft()) {
            return EitherConstructor.left(this.value);
        }
        return f(this.value);
    }
    asyncChain(f) {
        if (this.isLeft()) {
            return Promise.resolve(EitherConstructor.left(this.value));
        }
        return f(this.value);
    }
    or(x) {
        return this.isLeft() ? x : this;
    }
    unwrap() {
        if (this.isRight())
            return this.value;
        throw new Error("Either state is Left");
    }
}
export const { merge, mergeInOne, left, right, from, chain } = EitherConstructor;
export const isEither = (value) => value instanceof EitherConstructor;
//# sourceMappingURL=index.js.map
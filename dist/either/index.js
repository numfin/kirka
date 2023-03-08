import { None, Some } from "../option";
function create_either(v) {
    let inner = v;
    const api = {
        inner: () => inner,
        eq: (other) => EitherApi.eq(api, other),
        format: () => EitherApi.format(inner),
        isLeft: () => EitherApi.isLeft(inner),
        isRight: () => EitherApi.isRight(inner),
        unwrap: () => EitherApi.unwrap(inner),
        unwrapLeft: () => EitherApi.unwrapLeft(api),
        unwrapRight: () => EitherApi.unwrapRight(api),
        unwrapLeftOr: (default_value) => EitherApi.unwrapLeftOr(api, default_value),
        unwrapRightOr: (default_value) => EitherApi.unwrapRightOr(api, default_value),
        isLeftAnd: (fn) => EitherApi.isLeftAnd(api, fn),
        isRightAnd: (fn) => EitherApi.isRightAnd(api, fn),
        optionLeft: () => EitherApi.optionLeft(api),
        optionRight: () => EitherApi.optionRight(api),
        mapLeft: (fn) => EitherApi.mapLeft(api, fn),
        mapRight: (fn) => EitherApi.mapRight(api, fn),
        inspectLeft: (fn) => EitherApi.inspectLeft(api, fn),
        inspectRight: (fn) => EitherApi.inspectRight(api, fn),
        andThenLeft: (fn) => EitherApi.andThenLeft(api, fn),
        andThenRight: (fn) => EitherApi.andThenRight(api, fn),
        andLeft: (new_value) => EitherApi.andLeft(api, new_value),
        andRight: (new_value) => EitherApi.andRight(api, new_value),
    };
    return api;
}
export function Left(value) {
    return create_either({ value, type: "Left" });
}
export function Right(value) {
    return create_either({ value, type: "Right" });
}
export var EitherApi;
(function (EitherApi) {
    function format(either) {
        return `Either.${either.type}(${either.value})`;
    }
    EitherApi.format = format;
    function eq(self, other) {
        const a = self.inner();
        const b = other.inner();
        return a.type === b.type && a.value === b.value;
    }
    EitherApi.eq = eq;
    function unwrap(either) {
        return either.value;
    }
    EitherApi.unwrap = unwrap;
    function isLeft(either) {
        return either.type === "Left";
    }
    EitherApi.isLeft = isLeft;
    function isRight(either) {
        return either.type === "Right";
    }
    EitherApi.isRight = isRight;
    function unwrapLeft(either) {
        if (either.isRight()) {
            throw new Error(`unwrapLeft called on ${either.format()}`);
        }
        return either.unwrap();
    }
    EitherApi.unwrapLeft = unwrapLeft;
    function unwrapRight(either) {
        if (either.isLeft()) {
            throw new Error(`unwrapRight called on ${either.format()}`);
        }
        return either.unwrap();
    }
    EitherApi.unwrapRight = unwrapRight;
    function unwrapLeftOr(either, default_value) {
        return either.isLeft() ? either.unwrap() : default_value;
    }
    EitherApi.unwrapLeftOr = unwrapLeftOr;
    function unwrapRightOr(either, default_value) {
        return either.isRight() ? either.unwrap() : default_value;
    }
    EitherApi.unwrapRightOr = unwrapRightOr;
    function isLeftAnd(either, fn) {
        return either.isLeft() && fn(either.unwrap());
    }
    EitherApi.isLeftAnd = isLeftAnd;
    function isRightAnd(either, fn) {
        return either.isRight() && fn(either.unwrap());
    }
    EitherApi.isRightAnd = isRightAnd;
    function optionLeft(either) {
        return either.isLeft() ? Some(either.unwrap()) : None();
    }
    EitherApi.optionLeft = optionLeft;
    function optionRight(either) {
        return either.isRight() ? Some(either.unwrap()) : None();
    }
    EitherApi.optionRight = optionRight;
    function mapLeft(either, fn) {
        if (either.isLeft()) {
            return Left(fn(either.unwrap()));
        }
        return Right(either.unwrap());
    }
    EitherApi.mapLeft = mapLeft;
    function mapRight(either, fn) {
        if (either.isRight()) {
            return Right(fn(either.unwrap()));
        }
        return Left(either.unwrap());
    }
    EitherApi.mapRight = mapRight;
    function inspectLeft(either, fn) {
        either.mapLeft(fn);
        return either;
    }
    EitherApi.inspectLeft = inspectLeft;
    function inspectRight(either, fn) {
        either.mapRight(fn);
        return either;
    }
    EitherApi.inspectRight = inspectRight;
    function andThenLeft(either, fn) {
        if (either.isLeft()) {
            return fn(either.unwrap());
        }
        return Right(either.unwrap());
    }
    EitherApi.andThenLeft = andThenLeft;
    function andThenRight(either, fn) {
        if (either.isRight()) {
            return fn(either.unwrap());
        }
        return Left(either.unwrap());
    }
    EitherApi.andThenRight = andThenRight;
    function andLeft(either, other_either) {
        return either.andThenLeft(() => other_either);
    }
    EitherApi.andLeft = andLeft;
    function andRight(either, other_either) {
        return either.andThenRight(() => other_either);
    }
    EitherApi.andRight = andRight;
})(EitherApi || (EitherApi = {}));

import { None, Some } from "./option";
export var OptionFrom;
(function (OptionFrom) {
    function bool(v) {
        return v ? Some(v) : None();
    }
    OptionFrom.bool = bool;
    function nullable(v) {
        if (v !== undefined && v !== null) {
            return Some(v);
        }
        return None();
    }
    OptionFrom.nullable = nullable;
    function eitherLeft(either) {
        return either.toLeftOption();
    }
    OptionFrom.eitherLeft = eitherLeft;
    function eitherRight(either) {
        return either.toRightOption();
    }
    OptionFrom.eitherRight = eitherRight;
})(OptionFrom || (OptionFrom = {}));

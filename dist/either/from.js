export var EitherFrom;
(function (EitherFrom) {
    function optionLeft(option, defaultRight) {
        return option.toLeft(defaultRight);
    }
    EitherFrom.optionLeft = optionLeft;
    function optionRight(option, defaultLeft) {
        return option.toRight(defaultLeft);
    }
    EitherFrom.optionRight = optionRight;
})(EitherFrom || (EitherFrom = {}));

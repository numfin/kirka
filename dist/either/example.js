import { Left } from "./";
// Create Either<string, string>
const StrOrNum = Left("somestring");
// Convert left side to number
const NumOrNum = StrOrNum.mapLeft((_value) => 5);
// Extract both sides as one
// Will work same as NumOrNum.unwrapLeft()
const NumOnly = NumOrNum.unwrap();
// Everything above can be written this way too
const NumOnly_2 = StrOrNum.unwrapRightOr(5);
// Convert left side of Either if Left
const StrOrNum10 = StrOrNum.andThenLeft((_value) => Left(10));
// Same as
const StrOrNum10_2 = StrOrNum.andLeft(Left(10));
// Convert from Either<number, string> to Option<number>
const MaybeNumber = StrOrNum.optionLeft();

import { None, Some } from ".";
// Create Option<number>
const MaybeNumber = Some(3);
// Convert to Option<string>
const MaybeString = MaybeNumber.map((v) => v.toString());
// Take value and leave None in its place
const TakenString = MaybeString.take();
MaybeString.isNone() === true;
// MaybeNumber is untouched because map() creates new Option
MaybeNumber.isSome() === true;
// .or(default_value) uses default_value as replacement of None
const MaybeStringNew = TakenString.or(Some("Another string"));
// Same as
const MaybeStringNew_2 = MaybeStringNew.orElse(() => Some("Another string"));
// Take value without deleting original (throws error on None)
const MyString = MaybeStringNew.unwrap();
// Take value without deleting original with default on None
const MyString_2 = TakenString.unwrapOr("Replacement");
// Use new Option only if Some
const MaybeStringNoned = MaybeStringNew.and(None());
const MaybeStringNew_3 = MaybeStringNew.and(Some("Wow"));
// Same as
const MaybeStringNoned_2 = MaybeStringNew.andThen((_value) => None());
const MaybeStringNew_4 = MaybeStringNew.andThen((_value) => Some("Wow2"));

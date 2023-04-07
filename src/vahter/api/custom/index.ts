import { None, OptionFrom, Some } from "../../../option";
import { Pipe } from "../../../pipe";
import { Ok } from "../../../result";
import { RequiredVahter, Vahter, VahterTransformer } from "../../interface";

// export function CustomVahter<T, V extends Vahter, Api extends RequiredVahter<T, V>>(parentApi: Api) {
//   const api: CustomVahter & RequiredVahter<T, CustomVahter> = {
//     check(v) {
//       return transformers.call(v).isOk();
//     },
//     parse(v) {
//       return transformers.call(v);
//     },
//     optional() {
//       transformers = Pipe().chain(rule);
//       return api as CustomVahter;
//       return CustomVahter((v) =>
//         OptionFrom.nullable(v)
//           .map(transformers.call)
//           .map((parseResult) => parseResult.map(Some))
//           .unwrapOr(Ok(None()))
//       );
//     },
//   };

//   return api;
// }


Vahter.custom().transform().transform().is().is().transform()
Vahter.num().transform().is().transform().

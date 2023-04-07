import { Option } from "../option";
import { Result } from "../result";
import { ErrReport } from "./api/err-report";

export interface Vahter {
  check(v: unknown): boolean;
}
export interface RequiredVahter<Out, V extends Vahter> {
  parse(v: unknown): Result<Out, ErrReport>;
  optional(): V & OptionalVahter<Out>;
}
export interface OptionalVahter<Out> {
  parse(v: unknown): Result<Option<Out>, ErrReport>;
}

export interface VahterTransformer<T> {
  (v: unknown): Result<T, ErrReport>;
}
export interface VahterRule<T> extends Result<T, ErrReport> {}

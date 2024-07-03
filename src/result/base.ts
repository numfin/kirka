export const tagOK = "Ok";
export const tagErr = "Err";

export interface Ok<T> {
  type: typeof tagOK;
  value: T;
}
export interface Err<T> {
  type: typeof tagErr;
  err: T;
}
export type ResultUnion<T, E> = Ok<T> | Err<E>;

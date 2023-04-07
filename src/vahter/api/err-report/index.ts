import { Err } from "../../../result";
import type { Result } from "../../../result/interfaces";

export interface ErrReport {
  relatedTo: unknown;
  description: string;
  path: string[];
  fromThrow(err: unknown): ErrReport;
  msg(v: string): ErrReport;
  toErr<T>(): Result<T, ErrReport>;
}
export function ErrReport(relatedTo: unknown, path = []) {
  const api: ErrReport = {
    relatedTo,
    description: "",
    path,
    msg(v) {
      api.description = v;
      return api;
    },
    fromThrow(err) {
      api.description = String(err);
      return api;
    },
    toErr() {
      return Err(api);
    },
  };
  return api;
}

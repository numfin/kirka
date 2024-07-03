export declare const None: {
    type: string;
};
export type None = {
    type: "None";
};
export type Some<T> = {
    type: "Some";
    value: T;
};
export type OptionUnion<T> = None | Some<T>;
//# sourceMappingURL=base.d.ts.map
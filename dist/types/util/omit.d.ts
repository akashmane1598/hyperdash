export declare type Omit<TBase, TKeysToOmit> = Pick<TBase, Exclude<keyof TBase, TKeysToOmit>>;

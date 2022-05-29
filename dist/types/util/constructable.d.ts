/**
 * A function representing a constructor for some class
 */
export declare type Constructable<T> = new (...args: any[]) => T;
/**
 * A function representing a constructor for an unknown class
 */
export interface UnknownConstructable extends Constructable<unknown> {}
/**
 * A function representing a constructor for any object
 */
export interface ObjectConstructable extends Constructable<object> {}

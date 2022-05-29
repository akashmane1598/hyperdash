/**
 * A property location represents a position in the model tree.
 */
export declare class PropertyLocation<T = unknown> {
  readonly parentModel: object;
  private readonly propertyKey;
  private readonly setter;
  private readonly getter;
  /**
   * Creates a property location for a direct property of a model
   */
  static forModelProperty<T extends object, P extends keyof T>(model: T, property: P): PropertyLocation<T[P]>;
  /**
   * Creates a property location for a newly created child model with no location assignment. This location will convey
   * the parent model, but will not allow setting or getting.
   */
  static forUnassignedChildModel(parentModel: object): PropertyLocation<never>;
  private static readonly UNASSIGNED_LOCATION;
  private validator?;
  constructor(
    parentModel: object,
    propertyKey: string | number | symbol,
    setter: (value: T | undefined) => void,
    getter: () => T | undefined
  );
  /**
   * Adds validation function that will be run each time before invoking the setter
   */
  withValidator(validator: (value: unknown) => void): this;
  /**
   * Sets the location with the provided value, first validating it if provided with a validator
   */
  setProperty(value: T | undefined): void;
  /**
   * Gets the value from the provided location
   */
  getProperty(): T | undefined;
  /**
   * Converts the location to a string representation. All
   * locations with the same parentModel will have a unique string
   * representation.
   */
  toString(): string;
  /**
   * Creates a property location nested from the current one. object represents the object in the current
   * location, `propertyKey` is the path from that object to the new location. The parent model is retained.
   * If object is a model, it should use `PropertyLocation.forModelProperty` instead.
   */
  buildChildFromObjectAndKey<TKey extends keyof T>(object: T, propertyKey: TKey): PropertyLocation<T[TKey]>;
}

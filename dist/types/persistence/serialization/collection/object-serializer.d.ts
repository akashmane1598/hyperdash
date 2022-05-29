import { PropertyLocation } from '../../../model/property/property-location';
import { SerializationManager } from '../serialization-manager';
import { Serializer } from '../serializer';
/**
 * Handles serialization of a primitive JSON object, recursing back to the manager for each value
 */
export declare class ObjectSerializer implements Serializer<object, object> {
  private readonly serializationManager;
  constructor(serializationManager: SerializationManager);
  /**
   * @inheritdoc
   */
  canSerialize(value: unknown): value is object;
  /**
   * @inheritdoc
   */
  serialize<T extends object>(sourceObject: T, location?: PropertyLocation<T>): object;
}

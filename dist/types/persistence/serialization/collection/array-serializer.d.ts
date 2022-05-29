import { PropertyLocation } from '../../../model/property/property-location';
import { JsonPrimitiveArray } from '../../model-json';
import { SerializationManager } from '../serialization-manager';
import { Serializer } from '../serializer';
/**
 * Handles serialization of an array type, recursing back to the manager for each value
 */
export declare class ArraySerializer implements Serializer<unknown[], JsonPrimitiveArray> {
  private readonly serializationManager;
  constructor(serializationManager: SerializationManager);
  /**
   * @inheritdoc
   */
  canSerialize(value: unknown): value is unknown[];
  /**
   * @inheritdoc
   */
  serialize(array: unknown[], location?: PropertyLocation<unknown[]>): JsonPrimitiveArray;
}

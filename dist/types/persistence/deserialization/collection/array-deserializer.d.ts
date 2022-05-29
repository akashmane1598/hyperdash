import { PropertyLocation } from '../../../model/property/property-location';
import { JsonPrimitive, JsonPrimitiveArray } from '../../model-json';
import { DeserializationManager } from '../deserialization-manager';
import { Deserializer } from '../deserializer';
/**
 * Handles deserialization of an array type, recursing back to the manager for each value
 */
export declare class ArrayDeserializer implements Deserializer<JsonPrimitiveArray, unknown[]> {
  private readonly deserializationManager;
  constructor(deserializationManager: DeserializationManager);
  /**
   * @inheritdoc
   */
  canDeserialize(json: JsonPrimitive): json is JsonPrimitiveArray;
  /**
   * @inheritdoc
   */
  deserialize(array: JsonPrimitiveArray, location?: PropertyLocation<unknown[]>): unknown[];
}

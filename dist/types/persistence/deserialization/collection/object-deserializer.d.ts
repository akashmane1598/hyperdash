import { PropertyLocation } from '../../../model/property/property-location';
import { JsonPrimitive } from '../../model-json';
import { DeserializationManager } from '../deserialization-manager';
import { Deserializer } from '../deserializer';
/**
 * Handles deserialization of a primitive JSON object, recursing back to the manager for each value
 */
export declare class ObjectDeserializer implements Deserializer<object, object> {
  private readonly deserializationManager;
  constructor(deserializationManager: DeserializationManager);
  /**
   * @inheritdoc
   */
  canDeserialize(json: JsonPrimitive): json is object;
  /**
   * @inheritdoc
   */
  deserialize<T extends object>(object: T, location: PropertyLocation<T>): object;
}

import { PropertyLocation } from '../../model/property/property-location';
import { Logger } from '../../util/logging/logger';
import { JsonPrimitive } from '../model-json';
import { Deserializer } from './deserializer';
/**
 * Allows dynamic registration of deserializers, delegating to the first matching
 * Deserializer, by order of registration, for deserialization
 */
export declare class DeserializationManager {
  private readonly logger;
  private readonly deserializers;
  constructor(logger: Logger);
  /**
   * Adds a new deserialier to the lookup path for deserialization with highest priority
   */
  registerDeserializer<TSerialized extends JsonPrimitive = JsonPrimitive, TDeserialized = unknown>(
    deserializer: Deserializer<TSerialized, TDeserialized>
  ): void;
  /**
   * Searches for the first matching deserializer and delegates to it
   *
   * Throws Error if no deserializer can be determined or deserialization fails
   */
  deserialize<T = unknown>(json: JsonPrimitive, location?: PropertyLocation<T>): T;
  private getMatchingDeserializer;
}

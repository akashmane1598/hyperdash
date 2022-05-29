import { PropertyLocation } from '../../model/property/property-location';
import { Logger } from '../../util/logging/logger';
import { JsonPrimitive } from '../model-json';
import { Serializer } from './serializer';
/**
 * Allows dynamic registration of serializers, delegating to the first matching
 * serializer, by order of registration, for serialization
 */
export declare class SerializationManager {
  private readonly logger;
  private readonly serializers;
  constructor(logger: Logger);
  /**
   * Adds a new serializer to the lookup path for serialization
   */
  registerSerializer<TDeserialized = unknown, TSerialized extends JsonPrimitive = JsonPrimitive>(
    serializer: Serializer<TDeserialized, TSerialized>
  ): void;
  /**
   * Searches for the first matching serializer and delegates to it
   *
   * Throws Error if no serializer can be determined or serialization fails
   */
  serialize<S = unknown, T extends JsonPrimitive = JsonPrimitive>(value: S, location?: PropertyLocation<S>): T;
  private getMatchingSerializer;
}

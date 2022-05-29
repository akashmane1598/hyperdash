import { JsonPrimitive } from '../../model-json';
import { Deserializer } from '../deserializer';
/**
 * Handles deserialization of basic primitives: string, number, boolean, undefined and null.
 */
export declare class PrimitiveDeserializer implements Deserializer<JsonPrimitive, JsonPrimitive> {
  private static readonly ALLOWED_PRIMITIVE_TYPES;
  /**
   * @inheritdoc
   */
  canDeserialize(json: JsonPrimitive): json is JsonPrimitive;
  /**
   * @inheritdoc
   */
  deserialize(json: JsonPrimitive): JsonPrimitive;
}

import { JsonPrimitive } from '../../model-json';
import { Serializer } from '../serializer';
/**
 * Handles serialization of basic primitives: string, number, boolean, undefined and null.
 */
export declare class PrimitiveSerializer implements Serializer<JsonPrimitive> {
  private static readonly ALLOWED_PRIMITIVE_TYPES;
  /**
   * @inheritdoc
   */
  canSerialize(value: unknown): value is JsonPrimitive;
  /**
   * @inheritdoc
   */
  serialize(value: JsonPrimitive): JsonPrimitive;
}

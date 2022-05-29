import { DeserializationFunction } from '../../persistence/deserialization/deserializer';
import { JsonPrimitive } from '../../persistence/model-json';
import { SerializationFunction } from '../../persistence/serialization/serializer';
import { Logger } from '../../util/logging/logger';
/**
 * Store of metadata information about supported property types
 */
export declare class ModelPropertyTypeLibrary {
  private readonly logger;
  private static readonly NO_OP_VALIDATOR;
  private readonly propertyTypeMap;
  constructor(logger: Logger);
  /**
   * Registers the provided property type. No action is taken if the property type has
   * already been registered
   */
  registerPropertyType(propertyTypeData: ModelPropertyTypeRegistrationInformation): void;
  /**
   * Retrieves the validator function for the provided property type. Returns NO-OP validator
   * if the property type has not been registered.
   */
  getValidator(type: string | ModelPropertyTypeInstance): PropertyValidatorFunction;
  /**
   * Retrieves the customer serializer function for the provided property type. Returns undefined if
   * the property type has not been registered, or if no serializer exists.
   */
  getPropertySerializer<TDeserialized = unknown, TSerialized extends JsonPrimitive = JsonPrimitive>(
    type: string | ModelPropertyTypeInstance
  ): SerializationFunction<TDeserialized, TSerialized> | undefined;
  /**
   * Retrieves the customer deserializer function for the provided property type. Returns undefined if
   * the property type has not been registered, or if no deserializer exists.
   */
  getPropertyDeserializer<TSerialized extends JsonPrimitive = JsonPrimitive, TDeserialized = unknown>(
    type: string | ModelPropertyTypeInstance
  ): DeserializationFunction<TSerialized, TDeserialized> | undefined;
  private convertPropertyTypeRegistrationInfoToMetadata;
  private getMetadataOrLog;
  private typeToKey;
  private bindPotentialFunction;
}
/**
 * Registration information for a Model Property Type
 */
export interface ModelPropertyTypeRegistrationInformation<
  TDeserialized = unknown,
  TSerialized extends JsonPrimitive = JsonPrimitive
> {
  /**
   * The type key
   */
  type: string;
  /**
   * A potential validator for properties of this type
   */
  validator?: PropertyValidatorFunction;
  /**
   * A custom serializer for this property type. If defined, this will take precedence over the general
   * serialization search
   */
  serializer?: SerializationFunction<TDeserialized, TSerialized>;
  /**
   * A custom deserializer for this property type. If defined, this will take precedence over the general
   * deserialization search
   */
  deserializer?: DeserializationFunction<TSerialized, TDeserialized>;
}
/**
 * Represents an instance of a model property type
 */
export interface ModelPropertyTypeInstance {
  /**
   * The type key represented
   */
  key: string;
}
/**
 *  A validator function that returns a `string` with an error message if validation fails, else `undefined`
 *  Accepts the value to check, which should be in its serialized form, and a flag indicating whether
 *  null or undefined values are allowed.
 *
 */
export declare type PropertyValidatorFunction = (
  serializedValue: unknown,
  allowUndefinedOrNull: boolean,
  propertyTypeInstance: ModelPropertyTypeInstance
) => string | undefined;

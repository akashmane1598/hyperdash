import { DeserializationManager } from '../../../persistence/deserialization/deserialization-manager';
import { ModelJson } from '../../../persistence/model-json';
import { Constructable } from '../../../util/constructable';
import { ModelManager } from '../../manager/model-manager';
import { ModelPropertyTypeInstance, ModelPropertyTypeRegistrationInformation } from '../model-property-type-library';
import { PropertyLocation } from '../property-location';
/**
 * Model properties representing a nested model
 */
export declare class ModelPropertyType implements ModelPropertyTypeRegistrationInformation<object, ModelJson> {
  private readonly deserializationManager;
  private readonly modelManager;
  /**
   * Type key for model properties
   */
  static readonly TYPE: string;
  /**
   * @inheritdoc
   */
  readonly type: string;
  constructor(deserializationManager: DeserializationManager, modelManager: ModelManager);
  /**
   * @inheritdoc
   */
  validator(value: unknown, allowUndefinedOrNull: boolean): string | undefined;
  /**
   * @inheritdoc
   */
  deserializer(
    json: ModelJson | undefined,
    location: PropertyLocation<object>,
    propertyInstance: ModelModelPropertyTypeInstance
  ): object;
}
/**
 * A ModelPropertyType representing another model... yeah.
 */
export interface ModelModelPropertyTypeInstance extends ModelPropertyTypeInstance {
  /**
   * If the property is undefined, by default, use this class
   */
  defaultModelClass?: Constructable<object>;
}

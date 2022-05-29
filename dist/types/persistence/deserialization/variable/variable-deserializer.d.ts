import { PropertyLocation } from '../../../model/property/property-location';
import { VariableManager } from '../../../variable/manager/variable-manager';
import { JsonPrimitive } from '../../model-json';
import { Deserializer } from '../deserializer';
/**
 * Handles deserialization for variable strings representing any type of value
 */
export declare class VariableDeserializer implements Deserializer {
  private readonly variableManager;
  constructor(variableManager: VariableManager);
  /**
   * @inheritdoc
   */
  canDeserialize(json: JsonPrimitive): json is string;
  /**
   * @inheritdoc
   */
  deserialize(json: string, location: PropertyLocation): unknown;
}

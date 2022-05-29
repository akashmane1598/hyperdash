import { PropertyLocation } from '../../../model/property/property-location';
import { VariableManager } from '../../../variable/manager/variable-manager';
import { Serializer } from '../serializer';
/**
 * Handles deserialization for variable strings representing any type of value
 */
export declare class VariableSerializer implements Serializer<unknown, string> {
  private readonly variableManager;
  constructor(variableManager: VariableManager);
  /**
   * @inheritdoc
   */
  canSerialize(_value: unknown, location?: PropertyLocation): _value is unknown;
  /**
   * @inheritdoc
   */
  serialize(_value: unknown, location: PropertyLocation): string;
}

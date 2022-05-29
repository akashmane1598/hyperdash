import { Logger } from '../../../util/logging/logger';
import { ModelPropertyMetadata } from '../../registration/model-registration';
import { ModelPropertyTypeLibrary } from '../model-property-type-library';
/**
 * Performs validation of a single value, warning or throwing an error based on configuration
 * if validation does not pass.
 */
export declare class ModelPropertyValidator {
  private readonly modelPropertyTypeLibrary;
  private readonly logger;
  constructor(modelPropertyTypeLibrary: ModelPropertyTypeLibrary, logger: Logger);
  private strictSchema;
  /**
   * Performs the validation, throwing an error in strict mode or logging a warning otherwise
   */
  validate<T extends object>(value: unknown, propertyMetadata: ModelPropertyMetadata<T>): void;
  /**
   * If true, any validation errors are thrown as runtime errors
   */
  setStrictSchema(checkSchema: boolean): void;
}

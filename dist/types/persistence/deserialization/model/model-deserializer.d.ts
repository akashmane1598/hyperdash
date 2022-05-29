import { DataSourceManager } from '../../../data/data-source/manager/data-source-manager';
import { ModelManager } from '../../../model/manager/model-manager';
import { ModelPropertyTypeLibrary } from '../../../model/property/model-property-type-library';
import { PropertyLocation } from '../../../model/property/property-location';
import { ModelPropertyValidator } from '../../../model/property/validation/model-property-validator';
import { ModelLibrary } from '../../../model/registration/model-registration';
import { ThemeManager } from '../../../theming/theme-manager';
import { Logger } from '../../../util/logging/logger';
import { VariableManager } from '../../../variable/manager/variable-manager';
import { JsonPrimitive, ModelJson } from '../../model-json';
import { DeserializationManager } from '../deserialization-manager';
import { Deserializer } from '../deserializer';
/**
 * Handles deserialization of a JSON object with a registered type property,
 * instantiating the associated model class
 */
export declare class ModelDeserializer implements Deserializer<ModelJson, object> {
  private readonly deserializationManager;
  private readonly modelLibrary;
  private readonly modelManager;
  private readonly modelPropertyValidator;
  private readonly logger;
  private readonly dataSourceManager;
  private readonly variableManager;
  private readonly themeManager;
  private readonly modelPropertyTypeLibrary;
  constructor(
    deserializationManager: DeserializationManager,
    modelLibrary: ModelLibrary,
    modelManager: ModelManager,
    modelPropertyValidator: ModelPropertyValidator,
    logger: Logger,
    dataSourceManager: DataSourceManager,
    variableManager: VariableManager,
    themeManager: ThemeManager,
    modelPropertyTypeLibrary: ModelPropertyTypeLibrary
  );
  /**
   * @inheritdoc
   */
  canDeserialize(json: JsonPrimitive): json is ModelJson;
  /**
   * @inheritdoc
   */
  deserialize(json: ModelJson, location?: PropertyLocation<object>): object;
  private getDeserializationFunctionForProperty;
  private isObjectWithTypeProperty;
  private isRegisteredModelType;
  private validateProperty;
}

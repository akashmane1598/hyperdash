import { DataSourceManager } from '../../../data/data-source/manager/data-source-manager';
import { ModelManager } from '../../../model/manager/model-manager';
import { ModelPropertyTypeLibrary } from '../../../model/property/model-property-type-library';
import { ModelLibrary } from '../../../model/registration/model-registration';
import { ThemeManager } from '../../../theming/theme-manager';
import { ModelJson } from '../../model-json';
import { SerializationManager } from '../serialization-manager';
import { Serializer } from '../serializer';
/**
 * Handles serializaation of a model object into a dehydrated
 * JSON representation
 */
export declare class ModelSerializer implements Serializer<object, ModelJson> {
  private readonly modelManager;
  private readonly modelLibrary;
  private readonly serializationManager;
  private readonly dataSourceManager;
  private readonly themeManager;
  private readonly modelPropertyTypeLibrary;
  constructor(
    modelManager: ModelManager,
    modelLibrary: ModelLibrary,
    serializationManager: SerializationManager,
    dataSourceManager: DataSourceManager,
    themeManager: ThemeManager,
    modelPropertyTypeLibrary: ModelPropertyTypeLibrary
  );
  /**
   * @inheritdoc
   */
  canSerialize(value: unknown): value is object;
  /**
   * @inheritdoc
   */
  serialize<T extends object>(modelObject: T): ModelJson;
  private serializeThemeIfExists;
  private serializeDataIfExists;
  private getSerializationFunctionForProperty;
}

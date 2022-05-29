import { Constructable, ObjectConstructable, UnknownConstructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
import { ModelPropertyTypeInstance } from '../property/model-property-type-library';
/**
 * Model Library represents a story of metadata information describing the models in the system and their properties.
 */
export declare class ModelLibrary {
  private readonly logger;
  private readonly modelConstructorByType;
  private readonly modelClassMetadata;
  private readonly modelPropertyMetadata;
  private lastDeferredIndexRead;
  private currentlyProcessingDeferred;
  constructor(logger: Logger);
  /**
   * Registers a model class with the provieded information
   *
   * No action is taken if the model class or type has already been registered
   */
  registerModelClass(modelClass: ObjectConstructable, registrationInformation: ModelRegistrationInformation): void;
  /**
   * Associates a model property identified by the provided key with a model class.
   *
   * No action is taken if the property key has already been registered
   */
  registerModelProperty<T extends object>(
    modelClass: Constructable<T>,
    runtimeKey: keyof T,
    registrationInfo: ModelPropertyRegistrationInformation
  ): void;
  /**
   * Looks up and returns the constructor of the model class associated with the provided string.
   * Returns undefined if no class is found.
   */
  lookupModelClass(modelType: string): ObjectConstructable | undefined;
  /**
   * Looks up and returns the model metadata for the provided model class.
   * Returns undefined if no type is found.
   */
  lookupModelMetadata(modelClass: ObjectConstructable): ModelClassMetadata | undefined;
  /**
   * Returns an array of properties registered to the provided model class.
   *
   * Returns empty array if class is not found.
   */
  lookupModelProperties<T extends object>(modelClass: Constructable<T>): ModelPropertyMetadata<T>[];
  /**
   * Returns all model classes that contain `modelClass` on their prototype chain, including
   * the provided class if registered.
   */
  getAllCompatibleModelClasses(modelClass: ObjectConstructable): ObjectConstructable[];
  private trackNewModelType;
  private convertModelRegistrationInfoToMetadata;
  /**
   * Each discovered metadata object, in descending order (i.e. `[modelClassParent, modelClass]`)
   */
  private getMetadataChain;
  private convertPropertyRegistrationToMetadata;
  private processRegistrationQueue;
  private formatAsDisplayName;
}
/**
 * Registration information for a model property
 */
export interface ModelPropertyRegistrationInformation {
  /**
   * Key used for serializing/deserializing this model property
   */
  key: string;
  /**
   * When displaying in an editor, use this name.
   * Defaults to key value converted to Start Case.
   * Underscores, dashes and camel casing is all converted to spaces. Trailing and leading spaces
   * are removed, and the first letter of each word is capitalized.
   * i.e. my-special_key => My Special Key
   */
  displayName?: string;
  /**
   * See `ModelPropertyTypeLibrary`
   * An extensible string or object value that dictates the type of this property (for editing and validation)
   */
  type: string | ModelPropertyTypeInstance;
  /**
   * Is this property required to be set? If so, the editor will require it and validation will fail if missing
   * Defaults to false
   */
  required?: boolean;
}
/**
 * Registration information for a model class
 */
export interface ModelRegistrationInformation {
  /**
   * Key used for serializing/deserializing this model class
   */
  readonly type: string;
  /**
   * When displaying in an editor, use this name.
   * Defaults to type value converted to Start Case.
   * Underscores, dashes and camel casing is all converted to spaces. Trailing and leading spaces
   * are removed, and the first letter of each word is capitalized.
   * i.e. my-special_type => My Special Type
   */
  displayName?: string;
  /**
   * Model type for data source expected by this model
   */
  supportedDataSourceTypes?: ObjectConstructable[];
}
interface ModelClassMetadata extends Required<ModelRegistrationInformation> {}
/**
 * Model Property metadata after all defaults have been applied
 */
export interface ModelPropertyMetadata<T> extends Required<ModelPropertyRegistrationInformation> {
  /**
   * Name of the property key at runtime
   */
  runtimeKey: keyof T;
  /**
   * Constructor of type at runtime
   */
  runtimeType: UnknownConstructable | undefined;
  /**
   * An object containing property type metadata for this property.
   */
  type: ModelPropertyTypeInstance;
}
export {};

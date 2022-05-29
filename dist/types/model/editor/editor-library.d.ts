import { DataSourceManager } from '../../data/data-source/manager/data-source-manager';
import { RendererLibrary } from '../../renderer/registration/renderer-registration';
import { ThemeManager } from '../../theming/theme-manager';
import { ObjectConstructable, UnknownConstructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
import { ModelPropertyTypeInstance, ModelPropertyTypeLibrary } from '../property/model-property-type-library';
import { PropertyLocation } from '../property/property-location';
import { ModelLibrary, ModelPropertyMetadata } from '../registration/model-registration';
/**
 * Thoughts:
 * Create a new property type for each enum. That way, we can also do validation around it, localize
 * and potentially reuse actual editors.
 *
 * Editor container should aggregate changes and send them in some standard format.
 * Editor container should correctly nest.
 *
 */
/**
 * Editor library allows registering editor renderers to property types, and builds
 * a tree of information for generating dynamic editors given a specific model constructor
 */
export declare class EditorLibrary {
  private readonly modelLibrary;
  private readonly modelPropertyTypeLibrary;
  private readonly logger;
  private readonly rendererLibrary;
  private readonly themeManager;
  private readonly dataSourceManager;
  private readonly editorMetadata;
  private lastDecoratorIndexRead;
  constructor(
    modelLibrary: ModelLibrary,
    modelPropertyTypeLibrary: ModelPropertyTypeLibrary,
    logger: Logger,
    rendererLibrary: RendererLibrary,
    themeManager: ThemeManager,
    dataSourceManager: DataSourceManager
  );
  /**
   * Registers the provided editor class to a given model property type. No action is taken if that
   * model property already has an editor.
   */
  registerEditorRenderer(
    editorRendererClass: UnknownConstructable,
    registrationInformation: EditorRegistrationInformation
  ): void;
  /**
   * Gets data needed to build the editor for the provided model constructor, or undefined if the editor information
   * cannot be found.
   *  TODO Also show meta properties like data (maybe, more likely first-class), or theme
   */
  getEditorData(modelConstructor: ObjectConstructable): CompositeEditorData | undefined;
  private getModelPropertyEditorData;
  /**
   * Internal version does not clear queue before proceeding
   */
  private registerEditorRendererInternal;
  private processRegistrationQueue;
  private getEditorMatchingModelClasses;
  private getAllCompatibleModelClasses;
  private getThemeEditorForClass;
  private getDataEditorForClass;
}
export declare type NestedEditorData = UnresolvedCompositeEditorData | LeafEditorData | MultipleEditorData;
/**
 * Discriminating enum for editor subtypes
 */
export declare enum EditorKind {
  /**
   * Indicates composite type
   * @see CompositeEditorData
   */
  Composite = 0,
  /**
   * Indicates leaf type
   * @see LeafEditorData
   */
  Leaf = 1,
  /**
   * Indicates multiple type
   * @see MultipleEditorData
   */
  Multiple = 2,
  /**
   * Indicates unresolved type
   * @see UnresolvedCompositeEditorData
   */
  Unresolved = 3
}
/**
 * Data representing an editor or editor fragment for the referenced `modelClass`
 */
export interface EditorData {
  /**
   * Display title for editor
   */
  title: string;
  /**
   * Discriminator
   */
  kind: EditorKind;
}
/**
 * Data for a grouping of editors based on a model. This does not represent an editor itself, but should
 * be composed of subeditors.
 */
export interface CompositeEditorData extends EditorData {
  /**
   * Editors for properties of this model
   */
  subeditors: NestedEditorData[];
  /**
   * @inheritdoc
   */
  kind: EditorKind.Composite;
  /**
   * Editor for the theme of this model. Undefined if model is not themable.
   */
  themeEditor?: UnresolvedCompositeEditorData | MultipleEditorData;
  /**
   * Editor for the data source of this model. Undefined if model does not support data
   */
  dataEditor?: UnresolvedCompositeEditorData | MultipleEditorData;
}
/**
 * Represents an editor for a leaf property - that is a primitive or primitive collection,
 * as opposed to a model
 */
export interface LeafEditorData extends EditorData {
  /**
   * Validator for property, returning a string on validation failure or undefined otherwise
   */
  validator(value: unknown): string | undefined;
  /**
   * Renderable object for editor
   */
  editor: UnknownConstructable;
  /**
   * Metadata for the editable property
   */
  propertyMetadata: ModelPropertyMetadata<object>;
  /**
   * @inheritdoc
   */
  kind: EditorKind.Leaf;
}
/**
 * Represents a model inside another model. We don't use CompositeEditorData directly to prevent
 * infinite recursive loops from self referencing models (or cycles).
 */
export interface UnresolvedCompositeEditorData extends EditorData {
  /**
   * Model class represented by this editor
   */
  modelClass: ObjectConstructable;
  /**
   * @inheritdoc
   */
  kind: EditorKind.Unresolved;
  /**
   * Retrieves Property Location for this field in the provided model
   */
  getPropertyLocation<T>(model: object): PropertyLocation<T>;
  /**
   * Property type instance for this property
   */
  propertyTypeInstance: ModelPropertyTypeInstance;
}
/**
 * Represents a property that has multiple compatible models available.
 */
export interface MultipleEditorData extends EditorData {
  /**
   * Array of compatible model editor datas
   */
  compatibleEditors: UnresolvedCompositeEditorData[];
  /**
   * @inheritdoc
   */
  kind: EditorKind.Multiple;
}
/**
 * Metadata needed to register a new editor
 */
export interface EditorRegistrationInformation {
  /**
   * Property type associated with the editor being registered
   */
  propertyType: string;
}

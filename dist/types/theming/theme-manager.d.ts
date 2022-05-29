import { ModelManager } from '../model/manager/model-manager';
import { PropertyLocation } from '../model/property/property-location';
import { ModelLibrary } from '../model/registration/model-registration';
import { ModelJson } from '../persistence/model-json';
import { MergedTheme, ModelJsonWithTheme, Theme } from './theme';
/**
 * Manages themes for dashboards, allowing assigning retrieving hierarchical themes
 * tied to specific model instances.
 */
export declare class ThemeManager {
  private readonly modelManager;
  private readonly modelLibrary;
  private readonly themeByModel;
  private globalTheme;
  constructor(modelManager: ModelManager, modelLibrary: ModelLibrary, globalTheme: Required<Theme>);
  /**
   * Sets the global theme
   */
  setGlobalTheme(theme: Required<Theme>): void;
  /**
   * Sets specific overrides for the given model instance
   */
  setThemeForModel(theme: Theme, model: object): void;
  /**
   * Removes theme overrides for provided model
   */
  removeThemeForModel(model: object): void;
  /**
   * Retrieves a merged theme for the provided model applying
   * overrides in order of specificity.
   */
  getThemeForModel<T extends Theme>(model: object): MergedTheme<T>;
  /**
   * Returns true if the model JSON provided contains a theme property
   */
  modelJsonHasTheme(modelJson: ModelJson): modelJson is ModelJsonWithTheme;
  /**
   * Returns a property location corresponding to the theme attached to the provided model
   */
  getPropertyLocationForTheme(instance: object): PropertyLocation<Theme>;
  /**
   * Retrieves the value of the theme property associated with the provided key for this model.
   * Note: the propertyKey is not necessarily the same as the runtime key. It is the serialization key.
   */
  getThemePropertyForModel<T = string>(model: object, propertyKey: string): T | undefined;
  /**
   * Returns the original Theme object provided for this model, if any. This does not include
   * any resolved theme properties from parents or globals.
   */
  getThemeOverrideObjectProvidedByModel(model: object): Theme | undefined;
  private getThemeRuntimeKey;
  private getThemeHierarchy;
}

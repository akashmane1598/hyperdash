import { ModelManager } from '../../../hyperdash';
import { PropertyLocation } from '../../../model/property/property-location';
import { ModelJson } from '../../../persistence/model-json';
import { DataSource, ModelJsonWithData } from '../data-source';
/**
 * Manages data sources and their associations with specific models
 */
export declare class DataSourceManager {
  private readonly modelManager;
  constructor(modelManager: ModelManager);
  private readonly dataSourceByModelInstance;
  private readonly rootDataSourceByModelRoot;
  /**
   * Attaches a data source to the specified model. Overwrites any existing data source for
   * the specified model.
   */
  attach<T = unknown>(dataSource: DataSource<T>, model: object): void;
  /**
   * Removes the data source for the specified model. No action is taken if a data source is not defined
   * for this specific model.
   */
  detach(model: object): void;
  /**
   * Retrieves the data source for this model, if it exists. Returns undefined otherwise.
   */
  get<T>(model: object): DataSource<T> | undefined;
  /**
   * Type predicate returning true if the provided model object is a data source
   */
  isDataSource<TData = unknown, TModel extends Partial<DataSource<TData>> = {}>(
    model: TModel
  ): model is DataSource<TData> & TModel;
  /**
   * Returns true if the model JSON provided contains a data property
   */
  modelJsonHasData(modelJson: ModelJson): modelJson is ModelJsonWithData;
  /**
   * Returns a property location corresponding to the data attached to the provided model
   */
  getPropertyLocationForData(instance: object): PropertyLocation<DataSource<unknown>>;
  /**
   * Retrieves the data source attached to this model, if it exists. If not, it recursively checks for data sources
   * attached to ancestors, returning the closest, or undefined if no ancestor has a data source.
   * If the provided model is a data source, it will skip checking its parent, which would return the original
   * data modelInstance, and start its search with a grandparent model, continuing upwards like a regular model.
   */
  getClosest<T>(modelInstance: object): DataSource<T> | undefined;
  /**
   * Sets the root data source for the provided model tree. This data source will be used at the root of the resolution
   * tree.
   */
  setRootDataSource<T = unknown>(dataSource: DataSource<T>, rootModelInstance: object): void;
  /**
   * Retrieves the root data source for the tree containing the provided model, or undefined if missing.
   */
  getRootDataSource<T = unknown>(modelInstance: object): DataSource<T> | undefined;
}

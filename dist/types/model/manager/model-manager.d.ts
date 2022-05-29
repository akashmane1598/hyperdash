import { Constructable } from '../../util/constructable';
import { Logger } from '../../util/logging/logger';
import { ModelApiBuilder } from '../api/builder/model-api-builder';
import { ModelApi } from '../api/model-api';
import { BeforeModelDestroyedEvent } from '../events/before-model-destroyed-event';
import { ModelCreatedEvent } from '../events/model-created-event';
import { ModelDestroyedEvent } from '../events/model-destroyed-event';
/**
 * Model Manager creates, destroys and tracks existing models. It is used to maintain relationships between
 * models.
 */
export declare class ModelManager {
  private readonly logger;
  private readonly modelCreatedEvent;
  private readonly modelDestroyedEvent;
  private readonly beforeModelDestroyedEvent;
  private readonly modelInstanceMap;
  private readonly apiBuilders;
  private readonly decorators;
  constructor(
    logger: Logger,
    modelCreatedEvent: ModelCreatedEvent,
    modelDestroyedEvent: ModelDestroyedEvent,
    beforeModelDestroyedEvent: BeforeModelDestroyedEvent
  );
  /**
   * Constructs (@see `ModelManager.construct`) then initializes (@see `ModelManager.initialize`) it
   *
   * Throws Error if a parent is provided which is not tracked
   */
  create<T extends object>(modelClass: Constructable<T>, parent?: object): T;
  /**
   * Initializes the provided model instance, calling appropriate lifecycle hooks and marking it
   * ready.
   */
  initialize<T extends object>(modelInstance: T): T;
  /**
   * Constructs the provided class, tracking its relationships to other models based on the provided
   * parent.
   *
   * Models must be created through this method and cannot take constructor parameters.
   *
   * This does not initialize the model, which must be done separately. @see `ModelManager.initialize`
   *
   * Throws Error if a parent is provided which is not tracked
   */
  construct<T extends object>(modelClass: Constructable<T>, parent?: object): T;
  /**
   * Untracks any model instances descending from the provided value.
   *
   * If `value` is a model, it will be untracked along with its descendents, starting from the leaf of the model tree.
   * That is, a child will always be destroyed before its parent.
   *
   * If `value` is an array, each of its object-typed values will be recursively passed to this function.
   *
   * If `value` is a non-model, non-array object, each of its object-typed values will be recursively passed to this
   * function.
   *
   * If the value is a primitve or no model is found, no action is taken.
   */
  destroy(value: unknown): void;
  /**
   * Returns a copy of the children registered to the provided model.
   *
   * Throws Error if the provided instance is not tracked
   */
  getChildren(modelInstance: object): object[];
  /**
   * Returns the parent registered to the provided model, or undefined if
   * no parent is registered.
   *
   * Throws Error if the provided instance is not tracked
   */
  getParent(modelInstance: object): object | undefined;
  /**
   * Returns the root node in the model tree to which the provided instance
   * belongs. Returns itself if the provided node is a root.
   *
   * Throws Error if the provided instance is not tracked
   */
  getRoot(modelInstance: object): object;
  /**
   * Returns true if `potentialAncestor` is an ancestor of `model`.
   * Returns false otherwise, including if `model === potentialAncestor`.
   * Throws Error if `model` is not tracked
   */
  isAncestor(model: object, potentialAncestor: object): boolean;
  /**
   * Adds the provided API builder to the search list. The first builder that matches a given model,
   * in the order registered, will be used.
   */
  registerModelApiBuilder(modelApiBuilder: ModelApiBuilder<ModelApi>): void;
  /**
   * Returns true if the provided value is a tracked model, false otherwise
   */
  isTrackedModel(value: unknown): boolean;
  /**
   * Registeres a ModelDecorator which will be called when creating all future
   * model instances. @see `ModelDecorator`
   */
  registerDecorator(decorator: ModelDecorator): void;
  private removeChildFromParent;
  private trackNewChild;
  private getInstanceDataOrThrow;
  private modelHasInitHook;
  private modelHasDestroyHook;
  private buildApiForModel;
  private destroyModel;
}
/**
 * A decorator class that can optionally decorate created models.
 */
export interface ModelDecorator {
  /**
   * Will be invoked for each created model object before it is initialized and before the
   * creation event is published.
   */
  decorate(modelInstance: object, api: ModelApi): void;
}

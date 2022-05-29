import { BeforeModelDestroyedEvent } from '../../model/events/before-model-destroyed-event';
import { ModelChangedEvent } from '../../model/events/model-changed-event';
import { ModelManager } from '../../model/manager/model-manager';
import { PropertyLocation } from '../../model/property/property-location';
import { Logger } from '../../util/logging/logger';
/**
 * Variable manager handles read, write and update of variable values,
 * supporting serialization and deserialization to convert variables into
 * values and back.
 */
export declare class VariableManager {
  private readonly logger;
  private readonly modelManager;
  private readonly modelChangedEvent;
  private readonly beforeModelDestroyedEvent;
  private readonly variableDictionaries;
  private readonly variableReferences;
  constructor(
    logger: Logger,
    modelManager: ModelManager,
    modelChangedEvent: ModelChangedEvent,
    beforeModelDestroyedEvent: BeforeModelDestroyedEvent
  );
  /**
   * Assign a value to the given key and scope. Scope should be a model object.
   */
  set(key: string, value: unknown, modelScope: object): void;
  /**
   * Retrieves a value for the given key. If that value has been assigned in this scope,
   * it will be returned. Otherwise, scopes will be searched upwards in the model tree
   * returning undefined if no match is found.
   */
  get<T = unknown>(key: string, modelScope: object): T | undefined;
  /**
   * Indicates whether the provided key is registered, accessible at the given scope
   * and returns a defined value.
   */
  has(key: string, modelScope: object): boolean;
  /**
   * Begin tracking the provided expression at `location`. The value will be set based on
   * variables, and updated as variables changed.
   *
   * Throws Error if the provided location is already being tracked
   */
  registerReference(location: PropertyLocation, variableExpression: string): unknown;
  /**
   * Indicates whether the value at `location` is currently being tracked as a variable reference
   */
  isVariableReference(location: PropertyLocation): boolean;
  /**
   * Indicates whether the provided string should be treated as a variable expression
   */
  isVariableExpression(potentialExpression: string): boolean;
  /**
   * Ends tracking for the variable at `location`. Returns the original variable string.
   * The value at `location` is left as is.
   *
   * Throws Error if the provided location is not being tracked
   */
  deregisterReference(location: PropertyLocation): string;
  /**
   * Retrieves the original variable expression from `location`. This value will continue
   * to be tracked.
   *
   * Throws Error if the provided location is not being tracked
   */
  getVariableExpressionFromLocation(location: PropertyLocation): string;
  private getParentModelScope;
  private createVariableValue;
  private updateAllReferences;
  private updateReference;
  private getReferenceAtLocation;
  private getDictionaryContainingKey;
  private getOrCreateReferenceMapForModelContainingLocation;
  private getResolveDictionaryForModel;
  private getVariableValue;
  private updateValueReferenceTrackingFromEvaluationResult;
  private shadowExistingReferencesIfNeeded;
  private addPlaceholderVariable;
}

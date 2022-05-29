import { DashboardEventManager } from '../../communication/dashboard-event-manager';
import { ModelScopedDashboardEvent } from '../../communication/model-scoped-dashboard-event';
import { ModelManager } from '../manager/model-manager';
/**
 * Fired after a property of a model (or a child model) changes.
 */
export declare class ModelChangedEvent extends ModelScopedDashboardEvent<object> {
  private readonly modelManager;
  constructor(dashboardEventManager: DashboardEventManager, modelManager: ModelManager);
  /**
   * Shorthand method to call `publish` for a model
   */
  publishChange(model: object): void;
  /**
   * @inheritdoc
   */
  protected modelShouldReceiveEvent(listenerModel: object, eventSourceModel: object): boolean;
}

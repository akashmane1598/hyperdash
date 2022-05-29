import { DashboardEventManager } from '../../../communication/dashboard-event-manager';
import { ModelScopedDashboardEvent } from '../../../communication/model-scoped-dashboard-event';
import { ModelManager } from '../../../model/manager/model-manager';
export declare const dataRefreshEventKey: unique symbol;
/**
 * Fired for each model when a refresh is requested
 */
export declare class DataRefreshEvent extends ModelScopedDashboardEvent {
  private readonly modelManager;
  constructor(dashboardEventManager: DashboardEventManager, modelManager: ModelManager);
  /**
   * Shorthand method to call `publish` for a model
   */
  publishRefresh(model: object): void;
  /**
   * @inheritdoc
   */
  protected modelShouldReceiveEvent(listenerModel: object, eventSourceModel: object): boolean;
}

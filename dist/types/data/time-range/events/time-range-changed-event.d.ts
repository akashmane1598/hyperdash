import { DashboardEventManager } from '../../../communication/dashboard-event-manager';
import { ModelScopedDashboardEvent } from '../../../communication/model-scoped-dashboard-event';
import { ModelManager } from '../../../model/manager/model-manager';
import { TimeRange } from '../time-range';
/**
 * Fired for each model when the applicable time range is changed
 */
export declare class TimeRangeChangedEvent extends ModelScopedDashboardEvent<TimeRange> {
  private readonly modelManager;
  constructor(dashboardEventManager: DashboardEventManager, modelManager: ModelManager);
  /**
   * Shorthand method to call `publish` for a model
   */
  publishTimeRangeChange(model: object, newTimeRange: TimeRange): void;
  /**
   * @inheritdoc
   */
  protected modelShouldReceiveEvent(listenerModel: object, eventSourceModel: object): boolean;
}

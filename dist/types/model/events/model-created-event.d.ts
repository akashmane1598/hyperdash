import { DashboardEvent } from '../../communication/dashboard-event';
import { DashboardEventManager } from '../../communication/dashboard-event-manager';
export declare const modelCreatedEventKey: unique symbol;
/**
 * Fired after a model is created, before its properties are set and its initialization hook is run
 */
export declare class ModelCreatedEvent extends DashboardEvent<object> {
  constructor(dashboardEventManager: DashboardEventManager);
}

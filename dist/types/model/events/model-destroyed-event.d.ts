import { Observable } from 'rxjs';
import { DashboardEvent } from '../../communication/dashboard-event';
import { DashboardEventManager } from '../../communication/dashboard-event-manager';
export declare const modelDestroyedEventKey: unique symbol;
/**
 * Fired after a model is destroyed and any destroy hooks are called.
 */
export declare class ModelDestroyedEvent extends DashboardEvent<object> {
  constructor(dashboardEventManager: DashboardEventManager);
  /**
   * Returns a void observable that will notify once when the provided model is
   * destroyed, then complete.
   */
  getDestructionObservable(model: object): Observable<void>;
}

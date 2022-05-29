import { Observable } from 'rxjs';
import { DashboardEventKey, DashboardEventManager } from './dashboard-event-manager';
/**
 * Dashboard event which supports observing and publishing itself. By default, the constructed instance is the key.
 * This can be changed at construction by providing an optional second argument.
 */
export declare class DashboardEvent<TData> {
  protected readonly dashboardEventManager: DashboardEventManager;
  private readonly eventKey;
  constructor(dashboardEventManager: DashboardEventManager, eventKeyToUse?: DashboardEventKey);
  /**
   * Gets an observable for this event which will be notified when anyone publishes to it
   */
  getObservable(): Observable<TData>;
  /**
   * Publishes `data` to this event
   */
  publish(data: TData): void;
  /**
   * Returns the event key being used for this event
   */
  getKey(): DashboardEventKey;
}

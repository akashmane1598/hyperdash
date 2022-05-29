import { Observable } from 'rxjs';
/**
 * Orchestrates publishing and subscribing to events throughout the dashboarding system,
 * provides weakly typed APIs for publishing and subscribing. Using these APIs directly is discouraged,
 * instead use typed APIs provided by specific events.
 */
export declare class DashboardEventManager {
  private readonly eventSubject;
  /**
   * Returns an `Observable` notifying when the provided eventKey is published to. This must be
   * manually disposed of, as events are an infinite stream and thus never terminate on their own.
   */
  getObservableForEvent<T>(eventKey: DashboardEventKey): Observable<T>;
  /**
   * Publishes the provided value to the provided eventKey. Any registered subscribers will
   * be notified.
   */
  publishEvent<T>(eventKey: DashboardEventKey, value: T): void;
}
/**
 * An event key for a routeable dashboard event. This is used to publish and subscribe
 */
export declare type DashboardEventKey = object | symbol;

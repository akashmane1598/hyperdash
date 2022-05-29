import { Observable } from 'rxjs';
import { DashboardEvent } from './dashboard-event';
import { DashboardEventKey, DashboardEventManager } from './dashboard-event-manager';
/**
 * An event which is sourced from and scoped to a model. By default, the scope is the model
 * that generated the event.
 *
 * Decorated model event hooks will wrap and unwrap events of this type, respecting the provided scope.
 */
export declare class ModelScopedDashboardEvent<TData = undefined> extends DashboardEvent<ModelScopedData<TData>> {
  constructor(dashboardEventManager: DashboardEventManager, eventKeyToUse?: DashboardEventKey);
  /**
   * Returns an observable that extracts the data from any events originating from a model
   * that satisfies the `modelShouldReceiveEvent` predicate
   */
  getObservableForModel(model: object): Observable<TData>;
  /**
   * Returns true if an event originating from `eventSourceModel` should be propagated to a listener
   * from `listenerModel`
   */
  protected modelShouldReceiveEvent(listenerModel: object, eventSourceModel: object): boolean;
}
/**
 * An event occuring in the context of a model
 */
export interface ModelScopedData<TData> {
  /**
   * The model where the event ocurred
   */
  source: object;
  /**
   * Any data for this event
   */
  data: TData;
}
